  import { NextRequest, NextResponse } from 'next/server'
  import Groq from 'groq-sdk'
  import { createClient } from '@supabase/supabase-js'
  import { auth } from '@clerk/nextjs/server'

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  export async function POST(req: NextRequest) {
    try {
      const { userId } = await auth()
      console.log('USER ID:', userId)
      const { code, language } = await req.json()

      if (!code) {
        return NextResponse.json({ error: 'No code provided' }, { status: 400 })
      }

      const prompt = `You are an expert code reviewer. Analyze the following ${language !== 'Auto-detect' ? language : ''} code and return ONLY a JSON array of issues. No explanation, no markdown, just raw JSON.

  Each issue must have:
  - "severity": "critical" | "warning" | "suggestion"
  - "title": short issue name (max 8 words)
  - "description": clear explanation of the problem (1-2 sentences)
  - "fix": corrected code snippet (short, just the relevant part)

  Return between 3-6 issues. Focus on bugs, security flaws, performance, and code quality. If the code is mostly clean, return suggestions for improvement.

  Code to review:
  \`\`\`
  ${code}
  \`\`\`

  Return only the JSON array, nothing else.`

      const completion = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 1500,
      })

      const text = completion.choices[0]?.message?.content || '[]'
      const clean = text.replace(/```json|```/g, '').trim()
      const issues = JSON.parse(clean)

      // detect language label
      const detectedLang = language !== 'Auto-detect' ? language : 'Unknown'

      // save to supabase
      if (userId) {
    const { error } = await supabase.from('reviews').insert({
      user_id: userId,
      code,
      language: detectedLang,
      issues,
    })
    console.log('SUPABASE ERROR:', error)
  }

      return NextResponse.json({ issues })
    } catch (err) {
      console.error('GROQ ERROR:', JSON.stringify(err, null, 2))
      return NextResponse.json({ error: 'Review failed' }, { status: 500 })
    }
  }