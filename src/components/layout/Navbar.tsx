'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/theme/ThemeToggle';
import {
  Compass,
  FlaskConical,
  BookOpen,
  Calculator,
  GraduationCap,
  Sparkles,
  Award,
  Menu,
  X,
  Languages,
  Play,
  Home,
  Layers,
  ChevronDown,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chapterDropdownOpen, setChapterDropdownOpen] = useState(false);

  const isVectorActive = pathname.startsWith('/chapters/vector') || pathname.startsWith('/vector');
  const isDynamicsActive = !isVectorActive && (pathname.startsWith('/lessons') || pathname === '/');

  const navLinks = [
    { href: '/chapters/vector', label: 'Ch 2: Vector', labelBn: 'অধ্যায় ২: ভেক্টর', icon: Compass, badge: 'NEW' },
    { href: '/lessons', label: 'Ch 3: Dynamics', labelBn: 'অধ্যায় ৩: গতিবিদ্যা', icon: BookOpen },
    { href: '/one-shot-class', label: 'One-Shot', labelBn: 'ম্যারাথন ক্লাস', icon: Play },
    { href: '/lab', label: 'Physics Lab', labelBn: 'ল্যাব', icon: FlaskConical },
    { href: '/formulas', label: 'Formulas', labelBn: 'সূত্র সম্ভার', icon: Calculator },
    { href: '/questions', label: 'Board Bank', labelBn: 'বোর্ড প্রশ্ন', icon: GraduationCap },
    { href: '/glossary', label: 'Glossary', labelBn: 'শব্দকোষ', icon: Languages },
    { href: '/cq-solver', label: 'CQ Solver', labelBn: 'সৃজনশীল', icon: Sparkles },
  ];

  return (
    <>
      {/* Desktop & Main Header */}
      <header className="sticky top-0 z-40 bg-sand-surface/95 backdrop-blur-md border-b border-sand-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Brand */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange to-orange-deep flex items-center justify-center text-white font-extrabold text-base shadow-sm border border-orange-deep group-hover:scale-105 transition-transform">
                  Δ
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm sm:text-base tracking-tight text-maroon-deep">
                      HSC<span className="text-orange">PHYSICS</span>
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-forest-pale text-forest border border-forest-light">
                      XI-XII
                    </span>
                  </div>
                  <p className="text-[10px] text-sand-subtext -mt-0.5">
                    1st Paper • NCTB Lab
                  </p>
                </div>
              </Link>

              {/* Desktop Chapter Switcher Pill */}
              <div className="hidden md:flex items-center bg-sand-muted p-1 rounded-xl border border-sand-border ml-2 text-xs font-bold">
                <Link
                  href="/chapters/vector"
                  className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                    isVectorActive
                      ? 'bg-orange text-white shadow-xs'
                      : 'text-sand-text hover:text-orange-deep'
                  }`}
                >
                  <Compass size={13} />
                  <span>Ch 2: Vector</span>
                </Link>
                <Link
                  href="/lessons"
                  className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                    isDynamicsActive && pathname !== '/'
                      ? 'bg-maroon text-white shadow-xs'
                      : 'text-sand-text hover:text-maroon'
                  }`}
                >
                  <BookOpen size={13} />
                  <span>Ch 3: Dynamics</span>
                </Link>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all relative ${
                      isActive
                        ? 'bg-maroon text-white shadow-sm'
                        : 'text-sand-text hover:bg-sand-muted hover:text-orange-deep'
                    }`}
                  >
                    <Icon size={14} className={isActive ? 'text-white' : 'text-sand-subtext'} />
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[9px] font-extrabold px-1 py-0.2 rounded bg-orange-deep text-white">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <ThemeToggle variant="icon" />
              <Link
                href="/progress"
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-forest-pale border border-forest-light text-forest-deep text-xs font-bold hover:bg-forest hover:text-white transition-colors"
              >
                <Award size={14} />
                <span>Progress</span>
              </Link>
            </div>

            {/* Mobile Header Actions: Theme Toggle + Menu */}
            <div className="lg:hidden flex items-center gap-2">
              <ThemeToggle variant="icon" />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-sand-muted text-sand-text hover:text-orange border border-sand-border min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-sand-border bg-sand-surface px-4 pt-3 pb-6 space-y-3 max-h-[80vh] overflow-y-auto">
            {/* Quick Chapter Switcher on Mobile Drawer */}
            <div className="p-2 bg-sand-muted rounded-xl border border-sand-border grid grid-cols-2 gap-2 text-xs font-bold text-center">
              <Link
                href="/chapters/vector"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 ${
                  isVectorActive ? 'bg-orange text-white' : 'bg-sand-surface text-sand-text'
                }`}
              >
                <Compass size={14} />
                <span>Ch 2: Vector</span>
              </Link>
              <Link
                href="/lessons"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 ${
                  isDynamicsActive && pathname !== '/' ? 'bg-maroon text-white' : 'bg-sand-surface text-sand-text'
                }`}
              >
                <BookOpen size={14} />
                <span>Ch 3: Dynamics</span>
              </Link>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold min-h-[44px] ${
                      isActive
                        ? 'bg-maroon text-white font-bold'
                        : 'text-sand-text hover:bg-sand-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={16} />
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-orange-deep text-white">
                          {link.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] opacity-70 font-sans">{link.labelBn}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-2">
              <ThemeToggle variant="expanded" />
            </div>

            <div className="pt-3 border-t border-sand-border flex justify-between items-center text-xs">
              <Link
                href="/sources"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sand-subtext font-semibold hover:text-maroon py-2"
              >
                Textbook Sources
              </Link>
              <Link
                href="/progress"
                onClick={() => setMobileMenuOpen(false)}
                className="font-bold text-forest hover:underline py-2"
              >
                My Progress
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* MOBILE STICKY BOTTOM NAVIGATION BAR (PHONES 320px - 768px) */}
      {/* ========================================================================= */}
      <nav
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-sand-surface/95 backdrop-blur-md border-t border-sand-border shadow-lg"
      >
        <div className="max-w-md mx-auto grid grid-cols-5 h-16 items-center px-1">
          {/* Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center h-full text-center py-1 transition-colors ${
              pathname === '/' ? 'text-maroon-deep font-extrabold' : 'text-sand-subtext hover:text-sand-text'
            }`}
          >
            <Home size={18} />
            <span className="text-[10px] mt-0.5 font-medium">Home</span>
          </Link>

          {/* Chapter 2 Vector */}
          <Link
            href="/chapters/vector"
            className={`flex flex-col items-center justify-center h-full text-center py-1 transition-colors relative ${
              isVectorActive ? 'text-orange font-extrabold' : 'text-sand-subtext hover:text-sand-text'
            }`}
          >
            <Compass size={18} />
            <span className="text-[10px] mt-0.5 font-medium">Vector</span>
            <span className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
          </Link>

          {/* Chapter 3 Dynamics */}
          <Link
            href="/lessons"
            className={`flex flex-col items-center justify-center h-full text-center py-1 transition-colors ${
              isDynamicsActive && pathname !== '/' ? 'text-maroon font-extrabold' : 'text-sand-subtext hover:text-sand-text'
            }`}
          >
            <BookOpen size={18} />
            <span className="text-[10px] mt-0.5 font-medium">Dynamics</span>
          </Link>

          {/* Board Questions */}
          <Link
            href={isVectorActive ? '/chapters/vector#board-questions-section' : '/questions'}
            className={`flex flex-col items-center justify-center h-full text-center py-1 transition-colors ${
              pathname.startsWith('/questions') ? 'text-forest font-extrabold' : 'text-sand-subtext hover:text-sand-text'
            }`}
          >
            <GraduationCap size={18} />
            <span className="text-[10px] mt-0.5 font-medium">Board Bank</span>
          </Link>

          {/* Progress */}
          <Link
            href="/progress"
            className={`flex flex-col items-center justify-center h-full text-center py-1 transition-colors ${
              pathname.startsWith('/progress') ? 'text-forest-deep font-extrabold' : 'text-sand-subtext hover:text-sand-text'
            }`}
          >
            <Award size={18} />
            <span className="text-[10px] mt-0.5 font-medium">Progress</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
