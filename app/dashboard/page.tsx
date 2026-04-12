'use client'
import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [language, setLanguage] = useState('Auto-detect')

  if (isLoaded && !isSignedIn) {
    router.push('/')
    return null
  }

  const languages = ['Auto-detect','Python','JavaScript','TypeScript','Java','C++','Go','Rust']

  const detectLanguage = (code: string) => {
    if (/def |import |print\(/.test(code)) return 'Python'
    if (/const |let |var |=>/.test(code)) return 'JavaScript'
    if (/:\s*(string|number|boolean)/.test(code)) return 'TypeScript'
    if (/public class|System\.out/.test(code)) return 'Java'
    return 'Auto-detect'
  }

  const handleCodeChange = (val: string) => {
    setCode(val)
    setLanguage(detectLanguage(val))
  }

  const reviewCode = async () => {
    if (!code.trim()) return
    setLoading(true)
    setResults([])
    try {
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      })
      const data = await res.json()
      setResults(data.issues || [])
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const severityColor = (s: string) => {
    if (s === 'critical') return { color: '#f87171', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)' }
    if (s === 'warning') return { color: '#fbbf24', bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.2)' }
    return { color: '#4ade80', bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.2)' }
  }

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff', fontFamily: "'Syne', sans-serif" }}>

      {/* nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.5px', cursor: 'pointer' }} onClick={() => router.push('/')}>
          code<span style={{ color: '#4ade80' }}>sense</span>
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
          dashboard
        </div>
      </nav>

      {/* main */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>

        {/* header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '8px' }}>
            Review your code
          </h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontFamily: "'DM Mono', monospace" }}>
            Paste any code below and get instant AI feedback
          </p>
        </div>

        {/* editor */}
        <div style={{ background: '#111', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '0.5px solid rgba(255,255,255,0.08)', background: '#0d0d0d' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', background: '#ff5f57', borderRadius: '50%' }}></div>
              <div style={{ width: '10px', height: '10px', background: '#febc2e', borderRadius: '50%' }}></div>
              <div style={{ width: '10px', height: '10px', background: '#28c840', borderRadius: '50%' }}></div>
            </div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#4ade80' }}>{language}</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => handleCodeChange(e.target.value)}
            placeholder="// paste your code here..."
            style={{
              width: '100%', height: '320px', background: 'transparent', border: 'none', outline: 'none',
              color: '#fff', fontFamily: "'DM Mono', monospace", fontSize: '13px', lineHeight: 1.8,
              padding: '20px 24px', resize: 'vertical',
            }}
          />
        </div>

        {/* actions */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
          <button
            onClick={reviewCode}
            disabled={loading || !code.trim()}
            style={{
              background: loading ? 'rgba(74,222,128,0.5)' : '#4ade80', color: '#0a0a0a',
              fontSize: '14px', fontWeight: 500, padding: '12px 28px', borderRadius: '8px',
              border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'DM Mono', monospace",
            }}
          >
            {loading ? 'reviewing...' : 'review my code'}
          </button>
          <button
            onClick={() => { setCode(''); setResults([]); setLanguage('Auto-detect') }}
            style={{
              background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: '14px',
              padding: '12px 20px', borderRadius: '8px', border: '0.5px solid rgba(255,255,255,0.15)',
              cursor: 'pointer', fontFamily: "'DM Mono', monospace",
            }}
          >
            clear
          </button>
        </div>

        {/* results */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '48px', color: 'rgba(255,255,255,0.3)', fontFamily: "'DM Mono', monospace", fontSize: '13px' }}>
            analyzing your code...
          </div>
        )}

        {results.length > 0 && (
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {['critical', 'warning', 'suggestion'].map(s => {
                const count = results.filter(r => r.severity === s).length
                if (!count) return null
                const c = severityColor(s)
                return (
                  <span key={s} style={{ fontSize: '11px', padding: '4px 12px', borderRadius: '20px', background: c.bg, border: `0.5px solid ${c.border}`, color: c.color, fontFamily: "'DM Mono', monospace" }}>
                    {count} {s}
                  </span>
                )
              })}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {results.map((issue, i) => {
                const c = severityColor(issue.severity)
                return (
                  <div key={i} style={{ background: '#111', border: `0.5px solid rgba(255,255,255,0.08)`, borderRadius: '12px', padding: '20px 24px', borderLeft: `3px solid ${c.color}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '10px', padding: '3px 10px', borderRadius: '20px', background: c.bg, color: c.color, fontFamily: "'DM Mono', monospace" }}>{issue.severity}</span>
                      <span style={{ fontSize: '15px', fontWeight: 700 }}>{issue.title}</span>
                    </div>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontFamily: "'DM Mono', monospace", lineHeight: 1.7, marginBottom: issue.fix ? '12px' : 0 }}>
                      {issue.description}
                    </p>
                    {issue.fix && (
                      <div style={{ background: '#0d0d0d', borderRadius: '8px', padding: '12px 16px' }}>
                        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', fontFamily: "'DM Mono', monospace", marginBottom: '6px' }}>suggested fix</div>
                        <pre style={{ margin: 0, fontSize: '12px', color: '#4ade80', fontFamily: "'DM Mono', monospace", whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{issue.fix}</pre>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {!loading && results.length === 0 && code.trim() === '' && (
          <div style={{ textAlign: 'center', padding: '48px', border: '0.5px dashed rgba(255,255,255,0.1)', borderRadius: '12px', color: 'rgba(255,255,255,0.2)', fontFamily: "'DM Mono', monospace", fontSize: '13px' }}>
            your review results will appear here
          </div>
        )}
      </div>
    </div>
  )
}