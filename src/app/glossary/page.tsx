'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { TERMINOLOGY_DICTIONARY } from '@/data/terminology';
import { TerminologyItem } from '@/types';
import {
  BookOpen,
  Search,
  Languages,
  AlertTriangle,
  FileText,
  Filter,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showBanglaDef, setShowBanglaDef] = useState(true);

  const categories = [
    { id: 'all', label: 'All Terms', count: TERMINOLOGY_DICTIONARY.length },
    { id: 'kinematics', label: 'Kinematics', count: TERMINOLOGY_DICTIONARY.filter(t => t.category === 'kinematics').length },
    { id: 'projectile', label: 'Projectile (প্রাস)', count: TERMINOLOGY_DICTIONARY.filter(t => t.category === 'projectile').length },
    { id: 'circular', label: 'Circular Motion', count: TERMINOLOGY_DICTIONARY.filter(t => t.category === 'circular').length },
    { id: 'forces', label: 'Forces & Pulleys (Bridge)', count: TERMINOLOGY_DICTIONARY.filter(t => t.category === 'forces').length },
  ];

  const filteredTerms = useMemo(() => {
    return TERMINOLOGY_DICTIONARY.filter((term) => {
      const matchesCategory =
        selectedCategory === 'all' || term.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        term.bangla.toLowerCase().includes(query) ||
        term.english.toLowerCase().includes(query) ||
        term.definition.toLowerCase().includes(query) ||
        (term.symbol && term.symbol.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-sand-border pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-pale text-orange-deep text-xs font-semibold border border-orange-light">
          <BookOpen size={14} />
          <span>NCTB Controlled Bilingual Dictionary</span>
        </div>
        <h1 className="text-3xl font-black text-maroon-deep tracking-tight">
          Dynamics Terminology &amp; Translation Dictionary
        </h1>
        <p className="text-xs sm:text-sm text-sand-subtext max-w-3xl leading-relaxed">
          Standardized English equivalents for Bangladesh HSC Physics 1st Paper, Chapter 3: Dynamics (গতিবিদ্যা). Designed to prevent translation traps and align classroom Bengali terminology with rigorous mathematical English.
        </p>
      </div>

      {/* Controls Bar: Search & Category Filter */}
      <div className="p-4 rounded-2xl bg-sand-surface border border-sand-border shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sand-subtext" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in English, বাংলা, or symbol (e.g. সরণ, প্রাস, a_c)..."
              className="w-full pl-10 pr-4 py-2 bg-sand-muted border border-sand-border rounded-xl text-xs text-sand-text placeholder-sand-subtext focus:outline-hidden focus:border-orange"
            />
          </div>

          <button
            onClick={() => setShowBanglaDef(!showBanglaDef)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-sand-surface border border-sand-border text-maroon-deep hover:bg-sand-muted transition-colors shadow-2xs"
          >
            <Languages size={14} />
            <span>{showBanglaDef ? 'Showing Bangla Definitions' : 'English Only'}</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-sand-border">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-maroon text-white shadow-xs'
                  : 'bg-sand-muted text-sand-text hover:bg-sand-border/40'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-sand-subtext px-1">
        <span>Showing {filteredTerms.length} of {TERMINOLOGY_DICTIONARY.length} technical entries</span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-orange-deep font-semibold hover:underline"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Dictionary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTerms.map((term) => (
          <div
            key={term.id}
            className="p-5 rounded-2xl bg-sand-surface border border-sand-border hover:border-orange-light shadow-2xs transition-all space-y-3.5 flex flex-col justify-between"
          >
            <div>
              {/* Top Row: Bangla & English Term */}
              <div className="flex items-start justify-between gap-3 border-b border-sand-border pb-3">
                <div>
                  <h3 className="text-base font-extrabold text-maroon-deep flex items-center gap-2">
                    {term.english}
                  </h3>
                  <div className="text-sm font-bold text-orange-deep mt-0.5 font-sans">
                    {term.bangla}
                  </div>
                </div>
                <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sand-muted border border-sand-border text-sand-subtext">
                  {term.category}
                </span>
              </div>

              {/* Symbol & SI Unit Row */}
              {(term.symbol || term.siUnit) && (
                <div className="flex flex-wrap items-center gap-3 py-2 text-xs">
                  {term.symbol && (
                    <div className="flex items-center gap-1.5 bg-sand-muted px-2.5 py-1 rounded-lg border border-sand-border">
                      <span className="text-sand-subtext text-[10px] font-bold uppercase">Symbol:</span>
                      <span className="font-mono font-bold text-maroon-deep">{term.symbol}</span>
                    </div>
                  )}
                  {term.siUnit && (
                    <div className="flex items-center gap-1.5 bg-sand-muted px-2.5 py-1 rounded-lg border border-sand-border">
                      <span className="text-sand-subtext text-[10px] font-bold uppercase">SI Unit:</span>
                      <span className="font-mono text-sand-text font-semibold">{term.siUnit}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Definition */}
              <p className="text-xs text-sand-text leading-relaxed pt-1">
                {term.definition}
              </p>

              {/* Bangla Definition */}
              {showBanglaDef && term.banglaDefinition && (
                <div className="mt-2.5 p-2.5 rounded-xl bg-maroon-pale/40 border border-maroon-light/60 text-xs text-maroon-deep font-sans leading-relaxed">
                  <span className="text-[10px] font-bold block text-maroon uppercase tracking-wider mb-0.5">
                    বাংলা সংজ্ঞা:
                  </span>
                  {term.banglaDefinition}
                </div>
              )}

              {/* Related Equation */}
              {term.relatedEquation && (
                <div className="mt-3 p-2 rounded-xl bg-sand-muted border border-sand-border font-mono text-xs text-orange-deep font-bold">
                  {term.relatedEquation}
                </div>
              )}

              {/* Common Translation Traps Alert */}
              {term.commonMistranslations && term.commonMistranslations.length > 0 && (
                <div className="mt-3 p-3 rounded-xl bg-orange-pale/50 border border-orange-light text-xs text-sand-text space-y-1">
                  <div className="flex items-center gap-1.5 text-orange-deep font-bold text-[11px]">
                    <AlertTriangle size={13} />
                    <span>Common Translation &amp; Conceptual Traps:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-sand-text pl-1">
                    {term.commonMistranslations.map((trap, i) => (
                      <li key={i}>{trap}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Source Reference Footer */}
            {term.sourceReference && (
              <div className="pt-2 border-t border-sand-border/80 flex items-center justify-between text-[10px] text-sand-subtext">
                <span className="font-medium flex items-center gap-1">
                  <FileText size={11} className="text-sand-subtext" />
                  {term.sourceReference}
                </span>
                <Link href="/sources" className="text-orange hover:underline font-semibold flex items-center gap-0.5">
                  <span>Register</span>
                  <ExternalLink size={10} />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
