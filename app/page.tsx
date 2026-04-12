'use client'
import Link from 'next/link'
import { SignInButton, useAuth } from '@clerk/nextjs'

export default function Home() {
  const { isSignedIn } = useAuth()

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
<main style={{ color: '#fff', fontFamily: "'Syne', sans-serif", maxWidth: '1200px', margin: '0 auto' }}>

      {/* nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.5px' }}>
          code<span style={{ color: '#4ade80' }}>sense</span>
        </div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', fontFamily: "'DM Mono', monospace", fontSize: '13px' }}>
          <a href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>docs</a>
          <a href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>pricing</a>
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

      {/* hero */}
      <div style={{ padding: '40px 40px 60px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(74,222,128,0.1)', border: '0.5px solid rgba(74,222,128,0.3)', color: '#4ade80', fontSize: '11px', padding: '6px 14px', borderRadius: '20px', marginBottom: '32px', fontFamily: "'DM Mono', monospace" }}>
          <span style={{ width: '6px', height: '6px', background: '#4ade80', borderRadius: '50%', display: 'inline-block' }}></span>
          now in beta — free forever
        </div>

        <h1 style={{ fontSize: '64px', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-2px', marginBottom: '24px' }}>
          Your code.<br /><span style={{ color: '#4ade80' }}>Reviewed.</span><br />Instantly.
        </h1>

        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.45)', maxWidth: '440px', margin: '0 auto 40px', lineHeight: 1.7, fontFamily: "'DM Mono', monospace" }}>
          Paste any code and get AI-powered feedback on bugs, security, and performance in seconds.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '64px' }}>
          {isSignedIn ? (
            <Link href="/dashboard">
              <button style={{ background: '#4ade80', color: '#0a0a0a', fontSize: '14px', fontWeight: 500, padding: '14px 28px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: "'DM Mono', monospace" }}>
                go to dashboard
              </button>
            </Link>
          ) : (
            <SignInButton mode="modal">
              <button style={{ background: '#4ade80', color: '#0a0a0a', fontSize: '14px', fontWeight: 500, padding: '14px 28px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: "'DM Mono', monospace" }}>
                get started free
              </button>
            </SignInButton>
          )}
          <button style={{ background: 'transparent', color: 'rgba(255,255,255,0.6)', fontSize: '14px', padding: '14px 28px', borderRadius: '8px', border: '0.5px solid rgba(255,255,255,0.15)', cursor: 'pointer', fontFamily: "'DM Mono', monospace" }}>
            view on github
          </button>
        </div>

        {/* code preview */}
        <div style={{ background: '#111', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden', maxWidth: '680px', margin: '0 auto', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 16px', borderBottom: '0.5px solid rgba(255,255,255,0.08)', background: '#0d0d0d' }}>
            <div style={{ width: '10px', height: '10px', background: '#ff5f57', borderRadius: '50%' }}></div>
            <div style={{ width: '10px', height: '10px', background: '#febc2e', borderRadius: '50%' }}></div>
            <div style={{ width: '10px', height: '10px', background: '#28c840', borderRadius: '50%' }}></div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginLeft: '8px' }}>app.py — under review</span>
          </div>
          <div style={{ padding: '20px 24px', fontFamily: "'DM Mono', monospace", fontSize: '13px', lineHeight: 1.8 }}>
            <div><span style={{ color: '#c084fc' }}>def</span> <span style={{ color: '#4ade80' }}>get_user</span>(id):</div>
            <div>&nbsp;&nbsp;query = <span style={{ color: '#fb923c' }}>{`"SELECT * FROM users WHERE id={id}"`}</span></div>
            <div>&nbsp;&nbsp;<span style={{ color: 'rgba(255,255,255,0.25)' }}># no input sanitization</span></div>
            <div>&nbsp;&nbsp;<span style={{ color: '#c084fc' }}>return</span> db.execute(query)</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', padding: '16px', borderTop: '0.5px solid rgba(255,255,255,0.08)' }}>
            {[
              { type: 'critical', color: '#f87171', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)', text: 'SQL injection vulnerability' },
              { type: 'warning', color: '#fbbf24', bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.2)', text: 'No error handling on db' },
              { type: 'suggestion', color: '#4ade80', bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.2)', text: 'Use parameterized queries' },
            ].map((r) => (
              <div key={r.type} style={{ padding: '12px', borderRadius: '8px', background: r.bg, border: `0.5px solid ${r.border}` }}>
                <div style={{ fontSize: '10px', fontFamily: "'DM Mono', monospace", color: r.color, marginBottom: '4px' }}>{r.type}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontFamily: "'DM Mono', monospace" }}>{r.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* stats */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', padding: '48px 40px', borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
        {[
          { num: '10k+', label: 'reviews run' },
          { num: '8', label: 'languages supported' },
          { num: '<2s', label: 'avg response time' },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '36px', fontWeight: 800, color: '#4ade80', letterSpacing: '-1px' }}>{s.num}</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontFamily: "'DM Mono', monospace", marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* features */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
        {[
          { num: '01', title: 'Bug detection', desc: 'Catches logic errors, null refs, and edge cases before they hit prod.' },
          { num: '02', title: 'Security checks', desc: 'Flags injections, exposed secrets, and unsafe patterns automatically.' },
          { num: '03', title: 'Instant feedback', desc: 'No waiting. Results stream back in under 2 seconds, every time.' },
        ].map((f, i) => (
          <div key={f.num} style={{ padding: '32px 28px', borderLeft: i > 0 ? '0.5px solid rgba(255,255,255,0.06)' : 'none' }}>
            <div style={{ fontSize: '11px', fontFamily: "'DM Mono', monospace", color: 'rgba(255,255,255,0.2)', marginBottom: '16px' }}>{f.num}</div>
            <div style={{ fontSize: '16px', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.3px' }}>{f.title}</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontFamily: "'DM Mono', monospace", lineHeight: 1.7 }}>{f.desc}</div>
          </div>
        ))}
      </div>

    </main>
</div>
  )
}