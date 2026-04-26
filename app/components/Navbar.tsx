'use client'
import Link from 'next/link'
import { SignInButton, useAuth } from '@clerk/nextjs'

export default function Navbar() {
  const { isSignedIn } = useAuth()

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <div style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.5px', color: '#fff', fontFamily: "'Syne', sans-serif" }}>
          code<span style={{ color: '#4ade80' }}>sense</span>
        </div>
      </Link>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center', fontFamily: "'DM Mono', monospace", fontSize: '13px' }}>
        <a href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>docs</a>
        <a href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>pricing</a>
        {isSignedIn && (
          <Link href="/history" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
            history
          </Link>
        )}
        {isSignedIn ? (
          <Link href="/dashboard">
            <button style={{ background: '#4ade80', color: '#0a0a0a', fontSize: '13px', fontWeight: 500, padding: '8px 18px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontFamily: "'DM Mono', monospace" }}>
              dashboard
            </button>
          </Link>
        ) : (
          <SignInButton mode="modal">
            <button style={{ background: '#4ade80', color: '#0a0a0a', fontSize: '13px', fontWeight: 500, padding: '8px 18px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontFamily: "'DM Mono', monospace" }}>
              sign in
            </button>
          </SignInButton>
        )}
      </div>
    </nav>
  )
}