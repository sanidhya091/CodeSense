'use client'

import { useState } from 'react'

type Issue = {
  severity: 'critical' | 'warning' | 'suggestion'
  title: string
  description: string
  fix: string
}

type Review = {
  id: string
  language: string
  code: string
  issues: Issue[]
  created_at: string
}

const severityColor = (s: string) => {
  if (s === 'critical') return { color: '#f87171', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)' }
  if (s === 'warning') return { color: '#fbbf24', bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.2)' }
  return { color: '#4ade80', bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.2)' }
}

export default function HistoryList({ reviews }: { reviews: Review[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  if (reviews.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px', border: '0.5px dashed rgba(255,255,255,0.1)', borderRadius: '12px', color: 'rgba(255,255,255,0.2)', fontFamily: "'DM Mono', monospace", fontSize: '13px' }}>
        no reviews yet —{' '}
        <a href="/dashboard" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'underline' }}>
          run your first one
        </a>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {reviews.map((review) => {
        const isOpen = expandedId === review.id
        const date = new Date(review.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        const criticalCount = review.issues.filter(i => i.severity === 'critical').length
        const summary = `${review.issues.length} issue${review.issues.length !== 1 ? 's' : ''}${criticalCount > 0 ? ` · ${criticalCount} critical` : ''}`

        return (
          <div key={review.id} style={{ border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '12px', overflow: 'hidden' }}>

            {/* row */}
            <button
              onClick={() => setExpandedId(isOpen ? null : review.id)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '11px', fontFamily: "'DM Mono', monospace", background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', padding: '3px 10px', borderRadius: '4px' }}>
                  {review.language}
                </span>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontFamily: "'DM Mono', monospace" }}>
                  {summary}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', fontFamily: "'DM Mono', monospace" }}>{date}</span>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>{isOpen ? '▲' : '▼'}</span>
              </div>
            </button>

            {/* expanded */}
            {isOpen && (
              <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)', padding: '20px' }}>
                <pre style={{ fontSize: '12px', fontFamily: "'DM Mono', monospace", color: 'rgba(255,255,255,0.3)', background: '#0d0d0d', borderRadius: '8px', padding: '16px', overflowX: 'auto', maxHeight: '160px', whiteSpace: 'pre-wrap', wordBreak: 'break-all', marginBottom: '16px' }}>
                  {review.code.slice(0, 500)}{review.code.length > 500 ? '…' : ''}
                </pre>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {review.issues.map((issue, i) => {
                    const c = severityColor(issue.severity)
                    return (
                      <div key={i} style={{ background: '#111', borderRadius: '10px', padding: '16px 20px', borderLeft: `3px solid ${c.color}` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '20px', background: c.bg, color: c.color, fontFamily: "'DM Mono', monospace" }}>{issue.severity}</span>
                          <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>{issue.title}</span>
                        </div>
                        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontFamily: "'DM Mono', monospace", lineHeight: 1.7, margin: '0 0 10px' }}>
                          {issue.description}
                        </p>
                        {issue.fix && (
                          <div style={{ background: '#0d0d0d', borderRadius: '6px', padding: '10px 14px' }}>
                            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', fontFamily: "'DM Mono', monospace", marginBottom: '4px' }}>suggested fix</div>
                            <pre style={{ margin: 0, fontSize: '12px', color: '#4ade80', fontFamily: "'DM Mono', monospace", whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{issue.fix}</pre>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}