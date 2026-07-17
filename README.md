# 🧠 Saiki — Daily Wisdom for the Curious Mind

> Daily philosophy and psychology tips. Stoicism, Existentialism, Jungian wisdom — delivered beautifully to your inbox, push notifications, or in-app feed.

## ✨ Features

- **Daily Tips** — Curated insights from 12 schools of philosophy & psychology
- **Streak System** — Track your daily reading streak, earn XP, level up
- **Favorites** — Save insights that resonate, add personal reflections
- **Multi-School** — Stoicism, Existentialism, Jungian, Buddhist, Taoism, and more
- **Dark Academia UI** — Beautiful, immersive reading experience
- **PWA Support** — Install on any device, works offline
- **Push Notifications** — Daily wisdom alerts
- **Email Digest** — Morning philosophy in your inbox

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React, Tailwind CSS, Framer Motion |
| Backend | Next.js API Routes, Drizzle ORM |
| Database | SQLite (Turso/libSQL) |
| Auth | NextAuth v5 (Google + email) |
| AI | Claude API (tip generation) |
| Email | Resend |
| Hosting | Vercel |

## 🏃 Quick Start

```bash
# 1. Clone
git clone https://github.com/your-username/saiki.git
cd saiki

# 2. Install
npm install

# 3. Setup env
cp .env.example .env
# Fill in your keys

# 4. Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
saiki/
├── src/
│   ├── app/           # Pages (App Router)
│   ├── components/    # React components
│   ├── lib/           # Utilities, auth, DB
│   └── db/            # Drizzle schema
├── public/            # Static assets
└── CLAUDE.md          # AI rules
```

## 🧠 Schools of Thought

| School | Icon | Focus |
|--------|------|-------|
| Stoicism | 🏛️ | Control, virtue, resilience |
| Existentialism | 🌑 | Freedom, authenticity, meaning |
| Behaviorism | 🐀 | Conditioning, habits, reinforcement |
| Jungian Psychology | 🔮 | Shadow, archetypes, individuation |
| Buddhist Philosophy | 🪷 | Mindfulness, impermanence, suffering |
| Nihilism | 🕳️ | Meaninglessness, rebellion |
| Absurdism | 🎭 | Embracing the absurd, living fully |
| Pragmatism | 🔧 | Practical consequences, action |
| Humanism | 🤝 | Human potential, growth |
| Cognitive Psychology | 🧠 | Mental processes, biases |
| Freudian Psychology | 🛋️ | Unconscious, dreams, defense mechanisms |
| Taoism | ☯️ | Flow, balance, simplicity |

## 📄 License

MIT
