'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Flame, Heart, User, Menu, X } from 'lucide-react';

export default function Header({ streak = 0 }: { streak?: number }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-saiki-border/50 bg-saiki-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          <span className="text-xl font-semibold tracking-tight text-gold-gradient">
            Saiki
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-saiki-muted transition-colors hover:text-saiki-text"
          >
            <BookOpen size={16} />
            <span>Today</span>
          </Link>
          <Link
            href="/history"
            className="flex items-center gap-1.5 text-sm text-saiki-muted transition-colors hover:text-saiki-text"
          >
            <BookOpen size={16} />
            <span>Feed</span>
          </Link>
          <Link
            href="/favorites"
            className="flex items-center gap-1.5 text-sm text-saiki-muted transition-colors hover:text-saiki-text"
          >
            <Heart size={16} />
            <span>Saved</span>
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-1.5 text-sm text-saiki-muted transition-colors hover:text-saiki-text"
          >
            <User size={16} />
            <span>Profile</span>
          </Link>
        </nav>

        {/* Streak Badge + Mobile Menu */}
        <div className="flex items-center gap-3">
          {streak > 0 && (
            <div className="flex items-center gap-1.5 rounded-full border border-saiki-accent/30 bg-saiki-accent/10 px-3 py-1 text-sm">
              <Flame size={14} className="fire-animation text-saiki-accent" />
              <span className="font-medium text-saiki-accent">{streak}</span>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-saiki-muted transition-colors hover:bg-saiki-card md:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-saiki-border bg-saiki-bg/95 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col p-4 gap-1">
            <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 rounded-lg px-4 py-3 text-saiki-muted transition-colors hover:bg-saiki-card hover:text-saiki-text">
              <BookOpen size={18} />
              <span>Today&apos;s Tips</span>
            </Link>
            <Link href="/history" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 rounded-lg px-4 py-3 text-saiki-muted transition-colors hover:bg-saiki-card hover:text-saiki-text">
              <BookOpen size={18} />
              <span>Feed</span>
            </Link>
            <Link href="/favorites" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 rounded-lg px-4 py-3 text-saiki-muted transition-colors hover:bg-saiki-card hover:text-saiki-text">
              <Heart size={18} />
              <span>Saved</span>
            </Link>
            <Link href="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 rounded-lg px-4 py-3 text-saiki-muted transition-colors hover:bg-saiki-card hover:text-saiki-text">
              <User size={18} />
              <span>Profile</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
