'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, X, Sparkles } from 'lucide-react';

// ─── useTypewriter ───────────────────────────────────────
function useTypewriter(text: string, speed = 38, delay = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    timeout = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, delay);

    return () => { clearTimeout(timeout); clearInterval(interval); };
  }, [text, speed, delay]);

  return { displayed, done };
}

// ─── Navbar ──────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-20 px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center">
      <Link href="/" className="flex items-center">
        <span className="text-[21px] sm:text-[26px] tracking-tight text-white font-medium select-none">
          Saiki<span className="text-[#c9a84c]">&reg;</span>
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-2 text-[15px] text-white/70">
        <Link href="/history" className="hover:text-white transition-colors duration-200">Explore</Link>
        <span className="opacity-30">·</span>
        <Link href="/favorites" className="hover:text-white transition-colors duration-200">Saved</Link>
        <span className="opacity-30">·</span>
        <Link href="/profile" className="hover:text-white transition-colors duration-200">Profile</Link>
        <span className="opacity-30">·</span>
        <Link href="/today" className="hover:text-white transition-colors duration-200">Today</Link>
      </nav>

      <Link href="/today" className="hidden md:flex items-center gap-2 text-[15px] text-white hover:text-[#c9a84c] transition-colors duration-200">
        Start Thinking <ArrowRight size={14} />
      </Link>

      <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-[5px]" aria-label="Toggle menu">
        <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
        <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
      </button>

      {menuOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[19] bg-[#0a0a0f]/98 backdrop-blur-md flex flex-col items-center justify-center gap-8 md:hidden">
          <button onClick={() => setMenuOpen(false)} className="absolute top-5 right-5 text-white" aria-label="Close"><X size={28} /></button>
          <Link href="/history" onClick={() => setMenuOpen(false)} className="text-2xl text-white hover:text-[#c9a84c] transition-colors">Explore</Link>
          <Link href="/favorites" onClick={() => setMenuOpen(false)} className="text-2xl text-white hover:text-[#c9a84c] transition-colors">Saved</Link>
          <Link href="/profile" onClick={() => setMenuOpen(false)} className="text-2xl text-white hover:text-[#c9a84c] transition-colors">Profile</Link>
          <Link href="/today" onClick={() => setMenuOpen(false)} className="text-2xl text-white hover:text-[#c9a84c] transition-colors">Today</Link>
          <Link href="/today" onClick={() => setMenuOpen(false)} className="mt-4 px-8 py-3 bg-[#c9a84c] text-[#0a0a0f] rounded-full text-base font-medium hover:bg-[#d4af37] transition-colors">
            Start Thinking
          </Link>
        </motion.div>
      )}
    </header>
  );
}

// ─── Background Video (smooth cursor tracking) ───────────
function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const isDesktopRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    isDesktopRef.current = window.innerWidth >= 1024;
    if (!isDesktopRef.current) return;

    const SEEK_INTERVAL = 32;
    let lastSeekTime = 0;
    let animFrameId: number;

    const onMove = (e: MouseEvent) => {
      const dur = video.duration || 0;
      if (!dur) return;
      targetTimeRef.current = (e.clientX / window.innerWidth) * dur;
    };

    const loop = () => {
      const now = performance.now();
      const current = video.currentTime;
      const target = targetTimeRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.01 && now - lastSeekTime > SEEK_INTERVAL) {
        const ease = 0.18;
        video.currentTime = current + diff * ease;
        lastSeekTime = now;
      }
      animFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    animFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video && window.innerWidth < 1024) {
      video.autoplay = true;
      video.play().catch(() => {});
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover gpu-accelerated"
        style={{ objectPosition: '50% 20%' }}
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────
export default function HomePage() {
  const { displayed, done } = useTypewriter("Feed your mind.");

  return (
    <div className="relative bg-[#0a0a0f] text-white selection:bg-[#c9a84c]/30 antialiased overflow-x-hidden min-h-screen">
      <Navbar />
      <BackgroundVideo />

      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 min-h-screen flex flex-col justify-center py-32">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[48px] md:text-[64px] lg:text-[80px] font-light tracking-[-0.03em] text-white leading-[1.05] mb-6 whitespace-pre-wrap"
        >
          {displayed}
          {!done && <span className="inline-block w-[2px] h-[0.9em] bg-[#c9a84c] align-middle ml-1 animate-blink" />}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-[15px] md:text-[17px] text-white/40 leading-relaxed mb-10 whitespace-nowrap"
        >
          Choose your diet. Philosophy, psychology, and more — delivered daily.
        </motion.p>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex items-center gap-4">
          <Link href="/today" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#c9a84c] text-[#0a0a0f] rounded-full text-[14px] font-medium hover:bg-[#d4af37] transition-all duration-200">
            <Sparkles size={16} /> Today's Insight
          </Link>
          <Link href="/history" className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white rounded-full text-[14px] font-medium hover:border-[#c9a84c]/50 hover:text-[#c9a84c] transition-all duration-200">
            Explore All <ArrowRight size={14} />
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
