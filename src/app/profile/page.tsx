'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User, Settings, Bell, Mail, LogOut, ChevronRight,
  Moon, Globe, Shield, Zap, Star, Flame
} from 'lucide-react';
import Header from '@/components/Header';
import { SCHOOLS, getLevel, getLevelTitle } from '@/lib/utils';

const demoUser = {
  name: 'Isaac',
  email: 'isaac@example.com',
  xp: 285,
  streak: 7,
  bestStreak: 14,
  totalRead: 42,
  totalFaved: 12,
  preferredSchools: ['stoicism', 'jungian', 'absurdism'],
};

export default function ProfilePage() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);

  const { level, progress } = getLevel(demoUser.xp);
  const title = getLevelTitle(level);

  return (
    <div className="min-h-screen">
      <Header streak={demoUser.streak} />

      <main className="mx-auto max-w-3xl px-4 pt-24 pb-12">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-2xl border border-saiki-border/50 bg-saiki-card/60 p-6"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-saiki-accent/30 to-saiki-gold/10 text-2xl">
              🧠
            </div>
            <div>
              <h1 className="text-2xl font-bold text-saiki-text">{demoUser.name}</h1>
              <p className="text-sm text-saiki-muted">{demoUser.email}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="flex items-center gap-1 rounded-full bg-saiki-accent/10 px-2 py-0.5 text-xs font-medium text-saiki-accent">
                  <Star size={10} /> Level {level}: {title}
                </span>
                <span className="flex items-center gap-1 text-xs text-saiki-muted">
                  <Zap size={10} className="text-saiki-accent" /> {demoUser.xp} XP
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 grid grid-cols-2 gap-3"
        >
          <div className="rounded-xl border border-saiki-border/30 bg-saiki-card/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Flame size={16} className="text-saiki-accent" />
              <span className="text-sm text-saiki-muted">Current Streak</span>
            </div>
            <p className="text-2xl font-bold text-saiki-text">{demoUser.streak} days</p>
          </div>
          <div className="rounded-xl border border-saiki-border/30 bg-saiki-card/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Flame size={16} className="text-orange-400" />
              <span className="text-sm text-saiki-muted">Best Streak</span>
            </div>
            <p className="text-2xl font-bold text-saiki-text">{demoUser.bestStreak} days</p>
          </div>
          <div className="rounded-xl border border-saiki-border/30 bg-saiki-card/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star size={16} className="text-saiki-accent" />
              <span className="text-sm text-saiki-muted">Tips Read</span>
            </div>
            <p className="text-2xl font-bold text-saiki-text">{demoUser.totalRead}</p>
          </div>
          <div className="rounded-xl border border-saiki-border/30 bg-saiki-card/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={16} className="text-saiki-accent" />
              <span className="text-sm text-saiki-muted">Saved</span>
            </div>
            <p className="text-2xl font-bold text-saiki-text">{demoUser.totalFaved}</p>
          </div>
        </motion.div>

        {/* Preferred Schools */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 rounded-xl border border-saiki-border/30 bg-saiki-card/30 p-5"
        >
          <h3 className="mb-3 text-sm font-medium text-saiki-text">Your Schools of Interest</h3>
          <div className="flex flex-wrap gap-2">
            {demoUser.preferredSchools.map((schoolId) => {
              const school = SCHOOLS.find((s) => s.id === schoolId);
              if (!school) return null;
              return (
                <span
                  key={schoolId}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
                  style={{
                    backgroundColor: `${school.color}15`,
                    color: school.color,
                  }}
                >
                  {school.icon} {school.name}
                </span>
              );
            })}
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <h3 className="mb-3 text-sm font-medium text-saiki-text">Settings</h3>

          {/* Notifications */}
          <div className="rounded-xl border border-saiki-border/30 bg-saiki-card/30 divide-y divide-saiki-border/30">
            <button className="flex w-full items-center justify-between p-4 transition-colors hover:bg-saiki-border/10">
              <div className="flex items-center gap-3">
                <Bell size={18} className="text-saiki-muted" />
                <div className="text-left">
                  <p className="text-sm text-saiki-text">Push Notifications</p>
                  <p className="text-xs text-saiki-muted">Daily tip alerts</p>
                </div>
              </div>
              <div
                onClick={(e) => { e.stopPropagation(); setPushEnabled(!pushEnabled); }}
                className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors ${
                  pushEnabled ? 'bg-saiki-accent' : 'bg-saiki-border'
                }`}
              >
                <div
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    pushEnabled ? 'translate-x-5.5' : 'translate-x-0.5'
                  }`}
                />
              </div>
            </button>

            <button className="flex w-full items-center justify-between p-4 transition-colors hover:bg-saiki-border/10">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-saiki-muted" />
                <div className="text-left">
                  <p className="text-sm text-saiki-text">Email Digest</p>
                  <p className="text-xs text-saiki-muted">Morning wisdom in your inbox</p>
                </div>
              </div>
              <div
                onClick={(e) => { e.stopPropagation(); setEmailDigest(!emailDigest); }}
                className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors ${
                  emailDigest ? 'bg-saiki-accent' : 'bg-saiki-border'
                }`}
              >
                <div
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    emailDigest ? 'translate-x-5.5' : 'translate-x-0.5'
                  }`}
                />
              </div>
            </button>

            <button className="flex w-full items-center justify-between p-4 transition-colors hover:bg-saiki-border/10">
              <div className="flex items-center gap-3">
                <Globe size={18} className="text-saiki-muted" />
                <div className="text-left">
                  <p className="text-sm text-saiki-text">Preferred Schools</p>
                  <p className="text-xs text-saiki-muted">Customize your feed</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-saiki-muted" />
            </button>

            <button className="flex w-full items-center justify-between p-4 transition-colors hover:bg-saiki-border/10">
              <div className="flex items-center gap-3">
                <Moon size={18} className="text-saiki-muted" />
                <div className="text-left">
                  <p className="text-sm text-saiki-text">Appearance</p>
                  <p className="text-xs text-saiki-muted">Dark mode</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-saiki-muted" />
            </button>

            <button className="flex w-full items-center justify-between p-4 transition-colors hover:bg-saiki-border/10">
              <div className="flex items-center gap-3">
                <Shield size={18} className="text-saiki-muted" />
                <div className="text-left">
                  <p className="text-sm text-saiki-text">Privacy</p>
                  <p className="text-xs text-saiki-muted">Data and security</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-saiki-muted" />
            </button>
          </div>

          {/* Sign Out */}
          <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400 transition-colors hover:bg-red-500/10">
            <LogOut size={16} />
            Sign Out
          </button>
        </motion.div>
      </main>
    </div>
  );
}
