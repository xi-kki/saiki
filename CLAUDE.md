# Saiki — CLAUDE.md

## 🎯 Overview
- **One-liner:** Daily philosophy & psychology tips — delivered beautifully, anywhere you are
- **Type:** Web2 / PWA (Progressive Web App)
- **Status:** 🟢 Building — MVP in progress

## 🏗️ Tech Stack
- Language: TypeScript (strict mode)
- Frontend: Next.js 14 (App Router) + Tailwind CSS + Framer Motion
- Backend: Next.js API Routes
- Database: SQLite (libSQL/Turso for edge)
- Auth: NextAuth v5 (Google + email magic link)
- AI Content: Groq API (Llama 3.3 — fast, free tier, daily tip generation)
- Push: Web Push API (VAPID keys)
- Email: Resend (transactional + digest)
- Hosting: Vercel (frontend) + Turso (DB)
- Package Manager: npm

## 📁 Structure
```
saiki/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── page.tsx      # Home — today's tips
│   │   ├── tip/[id]/     # Single tip view
│   │   ├── favorites/    # Saved insights
│   │   ├── history/      # Feed — all tips
│   │   ├── profile/      # User profile + settings
│   │   └── api/          # API routes
│   ├── components/       # React components
│   ├── lib/              # Core logic, utilities, auth
│   └── db/               # Drizzle ORM schema
├── public/               # Static assets, PWA manifest
├── .env.example          # Environment variables
├── CLAUDE.md             # This file
└── README.md
```

## 🧠 Architecture
- **Data flow:** User opens app → Auth → Daily tips served → Read/favorite/streak tracked
- **Key modules:**
  1. **Tips Engine** — AI generates daily tips from 12 schools of thought
  2. **Streak System** — Gamified daily reading with XP + levels
  3. **Personalization** — Tips adapt based on engagement patterns
  4. **Multi-delivery** — Push notifications, email digest, in-app feed

## ⚡ Build Order
- Phase 1 (Foundation): ✅ Done — scaffold, deps, schema, layout
- Phase 2 (Core Build): 🔧 In Progress — pages, components, API routes
- Phase 3 (Quality): 🔲 Not started — security scan, type check, lint
- Phase 4 (Ship): 🔲 Not started — deploy, README, PWA icons

## 🔐 Security (NON-NEGOTIABLE)
1. NEVER commit .env — keep secrets in environment variables
2. Validate ALL user inputs (frontend + backend)
3. No console.log in production code — use proper logging
4. Handle loading, empty, error states in all UI components
5. Rate-limit public API endpoints

## ✅ Quality Gates Before Ship
- [ ] Secret scan (security_scan tool)
- [ ] TypeScript compiles with zero errors
- [ ] ESLint clean
- [ ] Happy path works end-to-end
- [ ] Error states don't crash the app
- [ ] README written
- [ ] PWA manifest + icons present
- [ ] Mobile responsive

## 🚫 What NOT To Do
- Don't chase edge cases before the core works
- Don't optimize prematurely
- Don't write custom auth — use NextAuth
- Don't hardcode anything that should be in .env
- Don't add features outside current phase

## 📝 Code Style
- TypeScript strict mode
- One file per logical unit
- TSDoc for all public functions
- Functional components + hooks
- Framer Motion for animations
- Tailwind CSS for styling
- Dark academia aesthetic (saiki-bg, saiki-card, saiki-accent)
