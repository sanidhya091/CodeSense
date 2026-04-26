import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import HistoryList from './HistoryList'
import Navbar from '@/app/components/Navbar'

export default async function HistoryPage() {
  const { userId } = await auth()
  if (!userId) redirect('/')

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: reviews, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase error:', error.message)
  }

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>
      <Navbar />
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 40px', fontFamily: "'Syne', sans-serif" }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '8px' }}>
          review history
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'DM Mono', monospace", fontSize: '13px', marginBottom: '40px' }}>
          {reviews?.length ?? 0} review{reviews?.length !== 1 ? 's' : ''} found
        </p>
        <HistoryList reviews={reviews ?? []} />
      </main>
    </div>
  )
}