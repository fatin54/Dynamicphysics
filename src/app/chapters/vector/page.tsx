'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { VECTOR_TOPICS } from '@/data/vectorCurriculum';
import { VECTOR_LESSONS } from '@/data/vectorLessons';
import { VECTOR_FORMULAS } from '@/data/vectorFormulas';
import { VECTOR_BOARD_QUESTIONS } from '@/data/vectorBoardQuestions';
import { BoardQuestion, VectorCategory } from '@/types';
import {
  Compass,
  ArrowRight,
  BookOpen,
  Calculator,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  RefreshCw,
  Lightbulb,
  Award,
  Layers,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
  Sliders,
} from 'lucide-react';

export default function VectorChapterPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'practice' | 'questions'>('overview');
  const [selectedCategory, setSelectedCategory] = useState<VectorCategory | 'all'>('all');
  const [useBangla, setUseBangla] = useState(false);

  // Filter States for Board Questions
  const [filterYear, setFilterYear] = useState<string>('all');
  const [filterBoard, setFilterBoard] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Expandable card states
  const [expandedHints, setExpandedHints] = useState<Record<string, boolean>>({});
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});

  // Interactive Calculator State: Dot/Cross Product
  const [vA, setVA] = useState({ x: 2, y: 3, z: -1 });
  const [vB, setVB] = useState({ x: 1, y: -2, z: 4 });

  // Interactive Calculator State: Riverboat
  const [rbWidth, setRbWidth] = useState(500); // meters
  const [rbCurrent, setRbCurrent] = useState(3); // m/s
  const [rbSpeed, setRbSpeed] = useState(5); // m/s
  const [rbAngle, setRbAngle] = useState(90); // degrees

  // Interactive Calculator State: Solenoidal Constant
  const [solC1, setSolC1] = useState(2);
  const [solC2, setSolC2] = useState(3);

  // Toggle helpers
  const toggleHint = (id: string) => {
    setExpandedHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSolution = (id: string) => {
    setExpandedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetFilters = () => {
    setFilterYear('all');
    setFilterBoard('all');
    setFilterCategory('all');
    setFilterType('all');
    setFilterStatus('all');
    setSearchQuery('');
  };

  // Math Calculations: Vector Products
  const dotProd = vA.x * vB.x + vA.y * vB.y + vA.z * vB.z;
  const magA = Math.sqrt(vA.x ** 2 + vA.y ** 2 + vA.z ** 2);
  const magB = Math.sqrt(vB.x ** 2 + vB.y ** 2 + vB.z ** 2);
  const cosTheta = magA > 0 && magB > 0 ? Math.max(-1, Math.min(1, dotProd / (magA * magB))) : 0;
  const angleDeg = (Math.acos(cosTheta) * 180) / Math.PI;

  const crossX = vA.y * vB.z - vA.z * vB.y;
  const crossY = -(vA.x * vB.z - vA.z * vB.x);
  const crossZ = vA.x * vB.y - vA.y * vB.x;
  const crossMag = Math.sqrt(crossX ** 2 + crossY ** 2 + crossZ ** 2);

  // Math Calculations: Riverboat
  const rbAngleRad = (rbAngle * Math.PI) / 180;
  const rbVy = rbSpeed * Math.sin(rbAngleRad);
  const rbVx = rbCurrent + rbSpeed * Math.cos(rbAngleRad);
  const rbTime = rbVy > 0 ? rbWidth / rbVy : 0;
  const rbDrift = rbVx * rbTime;
  const rbResultant = Math.sqrt(rbVx ** 2 + rbVy ** 2);

  const rbMinTime = rbSpeed > 0 ? rbWidth / rbSpeed : 0;
  const rbMinDrift = rbCurrent * rbMinTime;

  let rbZeroDriftAngle = 'Impossible (v <= u)';
  let rbZeroDriftTime = 'N/A';
  if (rbSpeed > rbCurrent) {
    const cosZd = -rbCurrent / rbSpeed;
    const zdAngle = (Math.acos(cosZd) * 180) / Math.PI;
    const zdR = Math.sqrt(rbSpeed ** 2 - rbCurrent ** 2);
    const zdTime = rbWidth / zdR;
    rbZeroDriftAngle = `${zdAngle.toFixed(2)}°`;
    rbZeroDriftTime = `${zdTime.toFixed(1)} s`;
  }

  // Solenoidal Solver
  const solConstantA = -(solC1 + solC2);

  // Filtered Board Questions
  const filteredQuestions = useMemo(() => {
    return VECTOR_BOARD_QUESTIONS.filter((q) => {
      if (filterYear !== 'all' && q.year.toString() !== filterYear) return false;
      if (filterBoard !== 'all' && q.board !== filterBoard) return false;
      if (filterCategory !== 'all' && q.vectorCategory !== filterCategory) return false;
      if (filterType !== 'all') {
        if (filterType === 'CQ' && !q.questionType.startsWith('CQ')) return false;
        if (filterType === 'MCQ' && q.questionType !== 'MCQ') return false;
      }
      if (filterStatus !== 'all' && q.verificationStatus !== filterStatus) return false;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesEn = q.questionEn.toLowerCase().includes(query);
        const matchesBn = q.questionBn.includes(query);
        const matchesBoard = q.board.toLowerCase().includes(query);
        const matchesYear = q.year.toString().includes(query);
        if (!matchesEn && !matchesBn && !matchesBoard && !matchesYear) return false;
      }
      return true;
    });
  }, [filterYear, filterBoard, filterCategory, filterType, filterStatus, searchQuery]);

  return (
    <div className="min-h-screen bg-sand-base pb-24 text-sand-text">
      {/* Top Banner / Breadcrumb */}
      <div className="bg-sand-surface border-b border-sand-border py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-sand-subtext hover:text-maroon font-semibold">
              Physics 1st Paper
            </Link>
            <span className="text-sand-border">/</span>
            <span className="font-bold text-orange-deep bg-orange-pale px-2 py-0.5 rounded border border-orange-light">
              Chapter 2: Vector (ভেক্টর)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setUseBangla(!useBangla)}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-sand-border bg-sand-muted hover:bg-sand-border transition-colors flex items-center gap-1.5"
            >
              <span>{useBangla ? '🇧🇩 বাংলা সক্রিয়' : '🇬🇧 English Active'}</span>
            </button>
            <Link
              href="/lessons"
              className="text-xs font-semibold text-sand-subtext hover:text-maroon underline underline-offset-2"
            >
              Switch to Chapter 3 (Dynamics) &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-sand-surface to-sand-base border-b border-sand-border pt-8 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-pale text-forest-deep text-xs font-bold border border-forest-light">
            <Compass size={14} />
            <span>NCTB Bangladesh HSC Standard Curriculum • Class XI</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-2">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-maroon-deep tracking-tight">
                Chapter 2: Vector <span className="text-sand-subtext font-light text-xl sm:text-2xl">(ভেক্টর)</span>
              </h1>
              <p className="text-sm sm:text-base text-sand-subtext leading-relaxed">
                Master 2D & 3D vector algebra, riverboat navigation mechanics, and vector calculus for Bangladesh HSC Board Examinations (2015–2026).
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-4 bg-sand-surface p-3.5 rounded-2xl border border-sand-border shadow-xs shrink-0">
              <div className="text-center">
                <span className="block text-lg font-extrabold text-orange">3</span>
                <span className="text-[10px] text-sand-subtext uppercase font-bold tracking-wider">Core Types</span>
              </div>
              <div className="w-px h-8 bg-sand-border" />
              <div className="text-center">
                <span className="block text-lg font-extrabold text-forest">14+</span>
                <span className="text-[10px] text-sand-subtext uppercase font-bold tracking-wider">Verified Years</span>
              </div>
              <div className="w-px h-8 bg-sand-border" />
              <div className="text-center">
                <span className="block text-lg font-extrabold text-maroon">100%</span>
                <span className="text-[10px] text-sand-subtext uppercase font-bold tracking-wider">Checked Math</span>
              </div>
            </div>
          </div>

          {/* Quick Nav Tabs */}
          <div className="pt-4 flex flex-wrap gap-2">
            {[
              { id: 'overview', label: 'Chapter Overview', labelBn: 'অধ্যায় সংক্ষেপ', icon: Layers },
              { id: 'practice', label: 'Interactive Solvers', labelBn: 'ইন্টারঅ্যাক্টিভ সিমুলেটর', icon: Calculator },
              { id: 'questions', label: 'Board Questions (2015–2026)', labelBn: 'বোর্ড প্রশ্ন সম্ভার', icon: GraduationCap },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-maroon text-white shadow-sm'
                      : 'bg-sand-surface border border-sand-border text-sand-text hover:bg-sand-muted'
                  }`}
                >
                  <Icon size={16} />
                  <span>{useBangla ? tab.labelBn : tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        {/* ========================================================================= */}
        {/* THE 3 PROMINENT CATEGORY CARDS (ALWAYS PROMINENT & STACKED ON PHONES) */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-maroon-deep flex items-center gap-2">
                <Sparkles size={18} className="text-orange" />
                <span>3 Required Core Topic Categories</span>
              </h2>
              <p className="text-xs text-sand-subtext">
                Tap any category to inspect lessons, formulas, interactive calculators, and verified board questions.
              </p>
            </div>
            <a
              href="#board-questions-section"
              className="text-xs font-bold text-forest hover:text-forest-deep flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Jump to 2015–2026 Board Bank</span>
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* TYPE 1 CARD */}
            <div className="bg-sand-surface rounded-2xl border-2 border-orange/40 hover:border-orange transition-all p-5 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-orange-pale text-orange-deep border border-orange-light">
                    Type 1 • Dot & Cross Product
                  </span>
                  <span className="text-xs font-bold text-sand-subtext">NCTB § 2.7–2.8</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-maroon-deep leading-snug">
                  Dot Product & Cross Product
                  <span className="block text-xs font-normal text-sand-subtext mt-0.5">ডট গুণন ও ক্রস গুণন</span>
                </h3>
                <p className="text-xs text-sand-text/90 leading-relaxed">
                  Scalar products, vector projections, orthogonal test (A · B = 0), unit normal vectors, area of parallelograms and triangles, and torque applications.
                </p>

                {/* Key Formula Snippet */}
                <div className="bg-sand-muted p-2.5 rounded-xl border border-sand-border font-mono text-[11px] text-maroon-deep space-y-1">
                  <div>A · B = AB cos θ = AxBx + AyBy + AzBz</div>
                  <div>|A × B| = AB sin θ (Area of Parallelogram)</div>
                </div>
              </div>

              <div className="pt-2 border-t border-sand-border flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setActiveTab('practice');
                    const el = document.getElementById('calc-dot-cross');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-orange hover:bg-orange-deep text-white text-xs font-bold text-center transition-colors shadow-xs"
                >
                  Practise & Calculate
                </button>
                <a
                  href="#board-questions-section"
                  onClick={() => setFilterCategory('dot-cross')}
                  className="py-2 px-3 rounded-xl bg-sand-muted hover:bg-sand-border text-sand-text text-xs font-semibold text-center transition-colors"
                >
                  Board Questions
                </a>
              </div>
            </div>

            {/* TYPE 2 CARD */}
            <div className="bg-sand-surface rounded-2xl border-2 border-forest/40 hover:border-forest transition-all p-5 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-forest-pale text-forest-deep border border-forest-light">
                    Type 2 • Riverboat Dynamics
                  </span>
                  <span className="text-xs font-bold text-sand-subtext">NCTB § 2.6 & 2.9</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-maroon-deep leading-snug">
                  Riverboat Problems
                  <span className="block text-xs font-normal text-sand-subtext mt-0.5">নদী-নৌকা সমস্যা ও আপেক্ষিক বেগ</span>
                </h3>
                <p className="text-xs text-sand-text/90 leading-relaxed">
                  Boat velocity relative to water vs. current, minimum crossing time (t_min = d/v at α = 90°), shortest distance / zero drift (cos α = -u/v), and downstream drift.
                </p>

                {/* Key Formula Snippet */}
                <div className="bg-sand-muted p-2.5 rounded-xl border border-sand-border font-mono text-[11px] text-forest-deep space-y-1">
                  <div>t = d / (v sin α) | t_min = d / v (α = 90°)</div>
                  <div>cos α = -u / v (Zero drift, reach opposite bank)</div>
                </div>
              </div>

              <div className="pt-2 border-t border-sand-border flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setActiveTab('practice');
                    const el = document.getElementById('calc-riverboat');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-forest hover:bg-forest-deep text-white text-xs font-bold text-center transition-colors shadow-xs"
                >
                  Simulate & Solve
                </button>
                <a
                  href="#board-questions-section"
                  onClick={() => setFilterCategory('riverboat')}
                  className="py-2 px-3 rounded-xl bg-sand-muted hover:bg-sand-border text-sand-text text-xs font-semibold text-center transition-colors"
                >
                  Board Questions
                </a>
              </div>
            </div>

            {/* TYPE 3 CARD */}
            <div className="bg-sand-surface rounded-2xl border-2 border-maroon/40 hover:border-maroon transition-all p-5 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-maroon-pale text-maroon-deep border border-maroon-light">
                    Type 3 • Vector Calculus
                  </span>
                  <span className="text-xs font-bold text-sand-subtext">NCTB § 2.10–2.11</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-maroon-deep leading-snug">
                  Gradient, Divergence & Curl
                  <span className="block text-xs font-normal text-sand-subtext mt-0.5">ভেক্টর ক্যালকুলাস</span>
                </h3>
                <p className="text-xs text-sand-text/90 leading-relaxed">
                  Del operator ∇, gradient ∇φ (vector), divergence ∇ · V (scalar), solenoidal condition (∇ · V = 0), curl ∇ × V, and irrotational fields.
                </p>

                {/* Key Formula Snippet */}
                <div className="bg-sand-muted p-2.5 rounded-xl border border-sand-border font-mono text-[11px] text-maroon-deep space-y-1">
                  <div>∇ · V = 0 &lt;==&gt; Solenoidal (Incompressible)</div>
                  <div>∇ × V = 0 &lt;==&gt; Irrotational (Conservative)</div>
                </div>
              </div>

              <div className="pt-2 border-t border-sand-border flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setActiveTab('practice');
                    const el = document.getElementById('calc-calculus');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-maroon hover:bg-maroon-deep text-white text-xs font-bold text-center transition-colors shadow-xs"
                >
                  Field Checker
                </button>
                <a
                  href="#board-questions-section"
                  onClick={() => setFilterCategory('vector-calculus')}
                  className="py-2 px-3 rounded-xl bg-sand-muted hover:bg-sand-border text-sand-text text-xs font-semibold text-center transition-colors"
                >
                  Board Questions
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE SOLVERS & CALCULATORS (TYPE 1, TYPE 2, TYPE 3) */}
        {/* ========================================================================= */}
        <section id="interactive-solvers" className="space-y-6">
          <div className="border-b border-sand-border pb-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-maroon-deep flex items-center gap-2">
              <Calculator size={20} className="text-orange" />
              <span>Interactive Formula Solvers & Field Analyzers</span>
            </h2>
            <p className="text-xs text-sand-subtext">
              Experiment with arbitrary numerical values, examine intermediate steps, and verify mathematical accuracy.
            </p>
          </div>

          <div className="space-y-8">
            {/* TOOL 1: DOT & CROSS PRODUCT SOLVER */}
            <div id="calc-dot-cross" className="bg-sand-surface rounded-2xl border border-sand-border p-5 sm:p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sand-border pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-orange-pale text-orange-deep border border-orange-light">
                    Type 1 Tool
                  </span>
                  <h3 className="text-base font-bold text-maroon-deep mt-1">
                    3D Dot Product & Cross Product Calculator
                  </h3>
                </div>
                <span className="text-xs text-sand-subtext font-mono">
                  A = ({vA.x}i + {vA.y}j + {vA.z}k), B = ({vB.x}i + {vB.y}j + {vB.z}k)
                </span>
              </div>

              {/* Input Sliders & Number Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Vector A Controls */}
                <div className="space-y-3 bg-sand-muted/50 p-4 rounded-xl border border-sand-border">
                  <h4 className="text-xs font-bold text-maroon-deep uppercase tracking-wider">Vector A Components</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[11px] text-sand-subtext font-semibold">Ax (i)</label>
                      <input
                        type="number"
                        value={vA.x}
                        onChange={(e) => setVA({ ...vA, x: parseFloat(e.target.value) || 0 })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-sand-border text-xs font-mono font-bold bg-sand-surface"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-sand-subtext font-semibold">Ay (j)</label>
                      <input
                        type="number"
                        value={vA.y}
                        onChange={(e) => setVA({ ...vA, y: parseFloat(e.target.value) || 0 })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-sand-border text-xs font-mono font-bold bg-sand-surface"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-sand-subtext font-semibold">Az (k)</label>
                      <input
                        type="number"
                        value={vA.z}
                        onChange={(e) => setVA({ ...vA, z: parseFloat(e.target.value) || 0 })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-sand-border text-xs font-mono font-bold bg-sand-surface"
                      />
                    </div>
                  </div>
                </div>

                {/* Vector B Controls */}
                <div className="space-y-3 bg-sand-muted/50 p-4 rounded-xl border border-sand-border">
                  <h4 className="text-xs font-bold text-maroon-deep uppercase tracking-wider">Vector B Components</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[11px] text-sand-subtext font-semibold">Bx (i)</label>
                      <input
                        type="number"
                        value={vB.x}
                        onChange={(e) => setVB({ ...vB, x: parseFloat(e.target.value) || 0 })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-sand-border text-xs font-mono font-bold bg-sand-surface"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-sand-subtext font-semibold">By (j)</label>
                      <input
                        type="number"
                        value={vB.y}
                        onChange={(e) => setVB({ ...vB, y: parseFloat(e.target.value) || 0 })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-sand-border text-xs font-mono font-bold bg-sand-surface"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-sand-subtext font-semibold">Bz (k)</label>
                      <input
                        type="number"
                        value={vB.z}
                        onChange={(e) => setVB({ ...vB, z: parseFloat(e.target.value) || 0 })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-sand-border text-xs font-mono font-bold bg-sand-surface"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculated Results */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-sand-surface rounded-xl border border-sand-border text-center">
                  <span className="text-[11px] text-sand-subtext block font-semibold">Dot Product A · B</span>
                  <span className="text-base font-extrabold text-orange font-mono">{dotProd.toFixed(2)}</span>
                  <span className="text-[10px] text-sand-subtext block">{dotProd === 0 ? 'Perpendicular (90°)' : 'Scalar'}</span>
                </div>
                <div className="p-3 bg-sand-surface rounded-xl border border-sand-border text-center">
                  <span className="text-[11px] text-sand-subtext block font-semibold">Included Angle θ</span>
                  <span className="text-base font-extrabold text-forest font-mono">{angleDeg.toFixed(2)}°</span>
                  <span className="text-[10px] text-sand-subtext block">{angleDeg > 90 ? 'Obtuse' : 'Acute'}</span>
                </div>
                <div className="p-3 bg-sand-surface rounded-xl border border-sand-border text-center">
                  <span className="text-[11px] text-sand-subtext block font-semibold">Cross Product A × B</span>
                  <span className="text-xs font-bold text-maroon font-mono block truncate">
                    {crossX}i {crossY >= 0 ? `+ ${crossY}` : `- ${Math.abs(crossY)}`}j {crossZ >= 0 ? `+ ${crossZ}` : `- ${Math.abs(crossZ)}`}k
                  </span>
                  <span className="text-[10px] text-sand-subtext block">Vector result</span>
                </div>
                <div className="p-3 bg-sand-surface rounded-xl border border-sand-border text-center">
                  <span className="text-[11px] text-sand-subtext block font-semibold">Area of Parallelogram</span>
                  <span className="text-base font-extrabold text-maroon-deep font-mono">{crossMag.toFixed(2)}</span>
                  <span className="text-[10px] text-sand-subtext block">sq. units</span>
                </div>
              </div>
            </div>

            {/* TOOL 2: RIVERBOAT SIMULATOR */}
            <div id="calc-riverboat" className="bg-sand-surface rounded-2xl border border-sand-border p-5 sm:p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sand-border pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-forest-pale text-forest-deep border border-forest-light">
                    Type 2 Tool
                  </span>
                  <h3 className="text-base font-bold text-maroon-deep mt-1">
                    Riverboat Navigation Simulator & Crossing Solver
                  </h3>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setRbAngle(90)}
                    className="px-2.5 py-1 text-xs font-bold rounded-lg bg-sand-muted hover:bg-sand-border border border-sand-border text-sand-text"
                  >
                    Preset: Min Time (90°)
                  </button>
                  {rbSpeed > rbCurrent && (
                    <button
                      onClick={() => {
                        const cosZd = -rbCurrent / rbSpeed;
                        const zdAngle = (Math.acos(cosZd) * 180) / Math.PI;
                        setRbAngle(Math.round(zdAngle));
                      }}
                      className="px-2.5 py-1 text-xs font-bold rounded-lg bg-forest-pale hover:bg-forest-light border border-forest-light text-forest-deep"
                    >
                      Preset: Zero Drift
                    </button>
                  )}
                </div>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-semibold text-sand-subtext block mb-1">River Width d (m)</label>
                  <input
                    type="number"
                    value={rbWidth}
                    onChange={(e) => setRbWidth(parseFloat(e.target.value) || 10)}
                    className="w-full px-3 py-1.5 rounded-xl border border-sand-border font-mono text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-sand-subtext block mb-1">Current Speed u (m/s)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={rbCurrent}
                    onChange={(e) => setRbCurrent(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 rounded-xl border border-sand-border font-mono text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-sand-subtext block mb-1">Boat Speed v (m/s)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={rbSpeed}
                    onChange={(e) => setRbSpeed(parseFloat(e.target.value) || 0.1)}
                    className="w-full px-3 py-1.5 rounded-xl border border-sand-border font-mono text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-sand-subtext block mb-1">Heading Angle α ({rbAngle}°)</label>
                  <input
                    type="range"
                    min="1"
                    max="179"
                    value={rbAngle}
                    onChange={(e) => setRbAngle(parseInt(e.target.value) || 90)}
                    className="w-full mt-2 accent-forest"
                  />
                </div>
              </div>

              {/* Results */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-sand-muted/50 rounded-xl border border-sand-border">
                  <span className="text-[11px] text-sand-subtext block font-semibold">Crossing Time t</span>
                  <span className="text-base font-extrabold text-forest font-mono">{rbTime.toFixed(1)} s</span>
                  <span className="text-[10px] text-sand-subtext block">t = d / (v sin α)</span>
                </div>
                <div className="p-3 bg-sand-muted/50 rounded-xl border border-sand-border">
                  <span className="text-[11px] text-sand-subtext block font-semibold">Downstream Drift x</span>
                  <span className={`text-base font-extrabold font-mono ${Math.abs(rbDrift) < 1 ? 'text-forest' : 'text-orange-deep'}`}>
                    {Math.abs(rbDrift) < 1 ? '0.00 m (Target!)' : `${rbDrift.toFixed(1)} m`}
                  </span>
                  <span className="text-[10px] text-sand-subtext block">{rbDrift >= 0 ? 'Downstream' : 'Upstream'}</span>
                </div>
                <div className="p-3 bg-sand-muted/50 rounded-xl border border-sand-border">
                  <span className="text-[11px] text-sand-subtext block font-semibold">Ground Resultant R</span>
                  <span className="text-base font-extrabold text-maroon font-mono">{rbResultant.toFixed(2)} m/s</span>
                  <span className="text-[10px] text-sand-subtext block">√(vx² + vy²)</span>
                </div>
                <div className="p-3 bg-sand-muted/50 rounded-xl border border-sand-border">
                  <span className="text-[11px] text-sand-subtext block font-semibold">Shortest Path Angle</span>
                  <span className="text-base font-extrabold text-forest-deep font-mono">{rbZeroDriftAngle}</span>
                  <span className="text-[10px] text-sand-subtext block">Time: {rbZeroDriftTime}</span>
                </div>
              </div>
            </div>

            {/* TOOL 3: VECTOR CALCULUS SOLENOIDAL EVALUATOR */}
            <div id="calc-calculus" className="bg-sand-surface rounded-2xl border border-sand-border p-5 sm:p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sand-border pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-maroon-pale text-maroon-deep border border-maroon-light">
                    Type 3 Tool
                  </span>
                  <h3 className="text-base font-bold text-maroon-deep mt-1">
                    Solenoidal Field Unknown Constant Calculator
                  </h3>
                </div>
                <span className="text-xs text-sand-subtext font-mono">
                  V = ({solC1}x + 3y)i + ({solC2}y - 2z)j + (x + az)k
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-sand-subtext block mb-1">
                    Coefficient of x in Vx (∂Vx/∂x)
                  </label>
                  <input
                    type="number"
                    value={solC1}
                    onChange={(e) => setSolC1(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 rounded-xl border border-sand-border font-mono text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-sand-subtext block mb-1">
                    Coefficient of y in Vy (∂Vy/∂y)
                  </label>
                  <input
                    type="number"
                    value={solC2}
                    onChange={(e) => setSolC2(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 rounded-xl border border-sand-border font-mono text-xs font-bold"
                  />
                </div>
              </div>

              <div className="bg-sand-muted p-4 rounded-xl border border-sand-border font-mono text-xs text-sand-text space-y-1">
                <div>Step 1: ∇ · V = ∂Vx/∂x + ∂Vy/∂y + ∂Vz/∂z</div>
                <div>Step 2: ∇ · V = {solC1} + {solC2} + a = {solC1 + solC2} + a</div>
                <div>Step 3: Setting ∇ · V = 0 for solenoidal condition:</div>
                <div className="text-sm font-extrabold text-maroon-deep pt-1">
                  Required Constant: a = {solConstantA}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* DEDICATED BOARD QUESTIONS (2015–2026) SECTION */}
        {/* ========================================================================= */}
        <section id="board-questions-section" className="space-y-6 pt-4">
          <div className="border-b border-sand-border pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-maroon-pale text-maroon-deep text-xs font-bold border border-maroon-light mb-2">
                <GraduationCap size={14} />
                <span>Verified Historical Archive (2015–2026 Inclusive)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-maroon-deep">
                Chapter 2 Board Examination Question Bank
              </h2>
              <p className="text-xs sm:text-sm text-sand-subtext">
                Authentic Creative Questions (CQ) & MCQs with step-by-step verified worked answers, examiner marking tips, and honest handling of missing years.
              </p>
            </div>

            <button
              onClick={resetFilters}
              className="self-start md:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sand-border bg-sand-surface text-sand-subtext hover:text-maroon text-xs font-semibold transition-colors"
            >
              <RefreshCw size={13} />
              <span>Reset Filters</span>
            </button>
          </div>

          {/* Interactive Filter Bar */}
          <div className="bg-sand-surface p-4 sm:p-5 rounded-2xl border border-sand-border shadow-xs space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sand-subtext" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search board questions by keyword, equation, board, or year..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-sand-border bg-sand-muted/50 text-xs sm:text-sm placeholder:text-sand-subtext focus:outline-none focus:border-maroon"
              />
            </div>

            {/* Dropdown Filters (Responsive Grid) */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {/* Category Filter */}
              <div>
                <label className="text-[11px] font-bold text-sand-subtext uppercase tracking-wider block mb-1">
                  Category
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-sand-border text-xs bg-sand-base font-semibold"
                >
                  <option value="all">All 3 Types</option>
                  <option value="dot-cross">Type 1: Dot/Cross</option>
                  <option value="riverboat">Type 2: Riverboat</option>
                  <option value="vector-calculus">Type 3: Calculus</option>
                </select>
              </div>

              {/* Year Filter (2015-2026 inclusive) */}
              <div>
                <label className="text-[11px] font-bold text-sand-subtext uppercase tracking-wider block mb-1">
                  Exam Year
                </label>
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-sand-border text-xs bg-sand-base font-semibold"
                >
                  <option value="all">All Years (2015–2026)</option>
                  <option value="2026">2026 (Candidate)</option>
                  <option value="2025">2025 (Model Paper)</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020 (Autopass)</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018 (Combined)</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                </select>
              </div>

              {/* Education Board Filter */}
              <div>
                <label className="text-[11px] font-bold text-sand-subtext uppercase tracking-wider block mb-1">
                  Education Board
                </label>
                <select
                  value={filterBoard}
                  onChange={(e) => setFilterBoard(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-sand-border text-xs bg-sand-base font-semibold"
                >
                  <option value="all">All Boards</option>
                  <option value="Dhaka">Dhaka Board</option>
                  <option value="Rajshahi">Rajshahi Board</option>
                  <option value="Cumilla">Cumilla Board</option>
                  <option value="Chattogram">Chattogram Board</option>
                  <option value="Jashore">Jashore Board</option>
                  <option value="Sylhet">Sylhet Board</option>
                  <option value="Dinajpur">Dinajpur Board</option>
                  <option value="Mymensingh">Mymensingh Board</option>
                  <option value="Combined Board">Combined Board (2018)</option>
                </select>
              </div>

              {/* Question Type Filter */}
              <div>
                <label className="text-[11px] font-bold text-sand-subtext uppercase tracking-wider block mb-1">
                  Format
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-sand-border text-xs bg-sand-base font-semibold"
                >
                  <option value="all">All Formats</option>
                  <option value="CQ">Creative (CQ Ga/Gha)</option>
                  <option value="MCQ">MCQ Multiple Choice</option>
                </select>
              </div>

              {/* Verification Status */}
              <div>
                <label className="text-[11px] font-bold text-sand-subtext uppercase tracking-wider block mb-1">
                  Provenance
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-sand-border text-xs bg-sand-base font-semibold"
                >
                  <option value="all">All Verifications</option>
                  <option value="Verified Official Board Paper">Official Board Paper</option>
                  <option value="Curriculum Practice Standard">Curriculum Benchmark</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filter Result Count & Missing Year Honest Notice */}
          <div className="flex items-center justify-between text-xs text-sand-subtext">
            <span>
              Showing <strong className="text-maroon-deep">{filteredQuestions.length}</strong> verified questions
            </span>
            {filterYear === '2020' && (
              <span className="text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                Note: 2020 Board Exams canceled nationwide due to COVID-19 (Autopass).
              </span>
            )}
          </div>

          {/* QUESTIONS LIST (STACKED TOUCH-FRIENDLY CARDS FOR MOBILE & DESKTOP) */}
          {filteredQuestions.length === 0 ? (
            /* Honest missing-year / filter handling */
            <div className="bg-sand-surface rounded-2xl border border-dashed border-sand-border p-8 text-center space-y-3">
              <HelpCircle size={32} className="mx-auto text-sand-subtext" />
              <h3 className="text-base font-bold text-maroon-deep">
                No verified question available for this category and year.
              </h3>
              <p className="text-xs text-sand-subtext max-w-md mx-auto">
                In strict accordance with our verified provenance standards, we do not fabricate unverified questions. Please adjust your filters to inspect adjacent years or other boards.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-maroon text-white text-xs font-bold hover:bg-maroon-deep transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredQuestions.map((q) => {
                const isHintOpen = !!expandedHints[q.id];
                const isSolutionOpen = !!expandedSolutions[q.id];

                return (
                  <article
                    key={q.id}
                    className="bg-sand-surface rounded-2xl border border-sand-border p-5 sm:p-6 shadow-xs space-y-4 hover:border-sand-border/80 transition-all"
                  >
                    {/* Card Header & Provenance */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sand-border pb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-maroon text-white">
                          {q.board} Board {q.year}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-sand-muted text-sand-text border border-sand-border">
                          {q.questionType} ({q.marks} Marks)
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-forest-pale text-forest-deep border border-forest-light flex items-center gap-1">
                          <ShieldCheck size={12} />
                          <span>{q.verificationStatus}</span>
                        </span>
                      </div>

                      <span className="text-[11px] text-sand-subtext font-mono">
                        {q.sourceReference}
                      </span>
                    </div>

                    {/* Question Statement */}
                    <div className="space-y-2">
                      <p className="text-sm sm:text-base font-medium text-sand-text leading-relaxed">
                        {useBangla ? q.questionBn : q.questionEn}
                      </p>

                      {/* Relevant Formula Pill */}
                      {q.relevantFormulaLatex && (
                        <div className="bg-sand-muted/50 p-2 rounded-xl border border-sand-border text-[11px] font-mono text-maroon-deep">
                          Formula Reference: {q.relevantFormulaLatex}
                        </div>
                      )}
                    </div>

                    {/* Progressive Hint (Collapsible) */}
                    <div>
                      <button
                        onClick={() => toggleHint(q.id)}
                        className="flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-900 transition-colors"
                      >
                        <Lightbulb size={14} className="text-amber-500" />
                        <span>{isHintOpen ? 'Hide Progressive Hint' : 'Need a Hint?'}</span>
                        {isHintOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>

                      {isHintOpen && (
                        <div className="mt-2 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 leading-relaxed">
                          {useBangla ? q.hintBn : q.hintEn}
                        </div>
                      )}
                    </div>

                    {/* Worked Solution (Collapsible) */}
                    <div>
                      <button
                        onClick={() => toggleSolution(q.id)}
                        className="w-full py-2.5 px-4 rounded-xl bg-sand-muted hover:bg-sand-border text-xs sm:text-sm font-bold text-maroon-deep flex items-center justify-between transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-forest" />
                          <span>{isSolutionOpen ? 'Collapse Worked Solution' : 'View Verified Worked Solution & Marks Breakdown'}</span>
                        </span>
                        {isSolutionOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>

                      {isSolutionOpen && (
                        <div className="mt-3 p-4 sm:p-5 rounded-xl bg-sand-base border border-sand-border space-y-4 text-xs sm:text-sm">
                          {/* Step-by-step calculations */}
                          <div className="space-y-2">
                            <h5 className="font-bold text-maroon-deep text-xs uppercase tracking-wider">
                              Step-by-Step Derivation
                            </h5>
                            <ol className="list-decimal list-inside space-y-1.5 text-sand-text font-mono text-xs leading-relaxed">
                              {(useBangla ? q.solutionStepsBn : q.solutionStepsEn).map((step, idx) => (
                                <li key={idx} className="pl-1">
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>

                          {/* Final Answer */}
                          <div className="p-3 bg-forest-pale rounded-xl border border-forest-light text-forest-deep font-bold text-xs sm:text-sm">
                            Final Answer: {useBangla ? q.finalAnswerBn : q.finalAnswerEn}
                          </div>

                          {/* Examiner Marking Scheme */}
                          <div className="bg-sand-surface p-3 rounded-xl border border-sand-border space-y-1 text-xs">
                            <strong className="text-maroon-deep block font-bold">
                              NCTB Examiner Marking Criteria:
                            </strong>
                            <p className="text-sand-subtext">{q.examinerMarkingTips}</p>
                          </div>

                          {/* Common Pitfalls */}
                          <div className="bg-rose-50 p-3 rounded-xl border border-rose-200 text-xs text-rose-950 space-y-1">
                            <strong className="block font-bold">Common Student Pitfalls:</strong>
                            <p>{q.commonMistakes}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
