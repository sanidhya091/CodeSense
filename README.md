# CodeSense — AI Code Review Platform

CodeSense is a full-stack AI-powered code review platform that analyzes source code and provides structured feedback to help developers identify issues and improve their code.

## Features

* 🤖 AI-powered code reviews using **Groq API + LLaMA 3.3 70B**
* 🔴 **Critical** — serious issues and potential bugs
* 🟠 **Warning** — potential risks and code-quality problems
* 🔵 **Suggestion** — recommended improvements
* 🧠 Automatic programming-language detection
* 📝 Integrated code editor
* 🔐 Authentication with **Clerk**
* 💾 Persistent review history with **Supabase PostgreSQL**
* 🔒 Row Level Security for user data
* 📱 Responsive UI

## Tech Stack

| Category       | Technologies                         |
| -------------- | ------------------------------------ |
| Frontend       | Next.js 14, TypeScript, Tailwind CSS |
| AI             | Groq API, LLaMA 3.3 70B              |
| Database       | Supabase, PostgreSQL                 |
| Authentication | Clerk                                |

## How It Works

```text
Write / Paste Code
       ↓
Language Detection
       ↓
AI Analysis
       ↓
LLaMA 3.3 70B
       ↓
Structured Review
       ↓
Critical / Warning / Suggestion
       ↓
Review History
```

## Getting Started

### Prerequisites

* Node.js
* npm
* Supabase project
* Clerk application
* Groq API key

### Installation

Clone the repository:

```bash
git clone https://github.com/sanidhya091/CodeSense.git
cd CodeSense
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file and add the required credentials for:

* Groq
* Supabase
* Clerk

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Project Goal

CodeSense was built to explore the integration of large language models into developer tooling.

Instead of treating an LLM as a standalone chatbot, CodeSense turns AI-generated analysis into a structured code-review workflow with severity-based feedback, authentication, and persistent review history.

## Author

**Sanidhya Singh**

* GitHub: https://github.com/sanidhya091
* LinkedIn: https://www.linkedin.com/in/sanidhya-singh-2aa6b7273/
