'use client';

import React, { useState } from 'react';
import { BOARD_QUESTIONS } from '@/data/boardQuestions';
import { BoardQuestion } from '@/types';
import {
  GraduationCap,
  Search,
  Filter,
  Lightbulb,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Award,
  Languages,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';

export default function QuestionsPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBoard, setSelectedBoard] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [useBangla, setUseBangla] = useState<boolean>(false);

  // Expanded states for hints & solutions
  const [expandedHints, setExpandedHints] = useState<Record<string, boolean>>({});
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});
  const [selectedMCQAnswers, setSelectedMCQAnswers] = useState<Record<string, string>>({});

  const boards = ['all', 'Dhaka', 'Rajshahi', 'Cumilla', 'Jashore', 'Chattogram', 'Sylhet', 'Dinajpur', 'Mymensingh', 'BUET Admission Test'];
  const years = ['all', '2024', '2023', '2021', '2019', '2018', '2017', '2015'];

  const toggleHint = (id: string) => {
    setExpandedHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSolution = (id: string) => {
    setExpandedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectMCQ = (qId: string, optKey: string) => {
    setSelectedMCQAnswers((prev) => ({ ...prev, [qId]: optKey }));
    setExpandedSolutions((prev) => ({ ...prev, [qId]: true }));
  };

  const filteredQuestions = BOARD_QUESTIONS.filter((q) => {
    const matchesBoard = selectedBoard === 'all' || q.board === selectedBoard;
    const matchesYear = selectedYear === 'all' || q.year.toString() === selectedYear;
    const matchesType =
      selectedType === 'all' ||
      (selectedType === 'MCQ' ? q.questionType === 'MCQ' : q.questionType !== 'MCQ');
    const term = searchQuery.toLowerCase();
    const matchesSearch =
      q.questionEn.toLowerCase().includes(term) ||
      q.questionBn.includes(term) ||
      q.board.toLowerCase().includes(term);

    return matchesBoard && matchesYear && matchesType && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sand-border pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-maroon-pale text-maroon-deep text-xs font-semibold mb-2 border border-maroon-light">
            <GraduationCap size={14} />
            <span>10-Year Examination Window • 2015 to 2024</span>
          </div>
          <h1 className="text-3xl font-black text-maroon-deep tracking-tight">
            Historical Board Question Bank
          </h1>
          <p className="text-xs sm:text-sm text-sand-subtext mt-1 max-w-2xl">
            Authentic examination questions from Dhaka, Rajshahi, Cumilla, Jashore, and other education boards. Practice with progressive disclosure: Try first &rarr; Reveal hint &rarr; View model answer.
          </p>
        </div>

        {/* Language switch */}
        <button
          onClick={() => setUseBangla(!useBangla)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-sand-surface border border-sand-border text-sand-text hover:text-orange transition-colors shadow-2xs"
        >
          <Languages size={14} />
          <span>{useBangla ? 'English View' : 'বাংলায় দেখুন'}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3 bg-sand-muted p-4 rounded-2xl border border-sand-border">
        {/* Search Input */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sand-subtext" />
          <input
            type="text"
            placeholder="Search questions by topic, keyword, or board (e.g. 'football', 'wall', 'goalkeeper')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-sand-surface border border-sand-border text-xs text-sand-text focus:outline-hidden focus:border-orange shadow-2xs"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Board Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-sand-subtext font-semibold">Board:</span>
            <select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-sand-surface border border-sand-border text-xs font-semibold text-sand-text focus:outline-hidden"
            >
              {boards.map((b) => (
                <option key={b} value={b}>{b === 'all' ? 'All Boards' : b}</option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-sand-subtext font-semibold">Year:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-sand-surface border border-sand-border text-xs font-semibold text-sand-text focus:outline-hidden"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y === 'all' ? 'All Years (2015-2024)' : y}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-sand-subtext font-semibold">Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-sand-surface border border-sand-border text-xs font-semibold text-sand-text focus:outline-hidden"
            >
              <option value="all">All Formats (MCQ &amp; CQ)</option>
              <option value="MCQ">Multiple Choice (MCQ)</option>
              <option value="CQ">Creative Questions (CQ)</option>
            </select>
          </div>

          <span className="text-[11px] text-sand-subtext ml-auto">
            Showing {filteredQuestions.length} verified questions
          </span>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-5">
        {filteredQuestions.map((q) => {
          const isHintOpen = expandedHints[q.id];
          const isSolutionOpen = expandedSolutions[q.id];
          const userMCQChoice = selectedMCQAnswers[q.id];

          return (
            <div
              key={q.id}
              className="p-6 rounded-2xl bg-sand-surface border border-sand-border shadow-xs space-y-4 text-xs sm:text-sm"
            >
              {/* Question Top Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sand-border pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-maroon text-white font-bold text-xs">
                    {q.board} {q.year}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-sand-muted border border-sand-border font-semibold text-[11px] text-sand-text">
                    {q.questionType === 'MCQ' ? 'MCQ (1 Mark)' : `Creative Question (${q.marks} Marks)`}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    q.difficulty === 'Easy' ? 'bg-forest-pale text-forest-deep' :
                    q.difficulty === 'Medium' ? 'bg-orange-pale text-orange-deep' :
                    'bg-maroon-pale text-maroon-deep'
                  }`}>
                    {q.difficulty}
                  </span>
                </div>

                <span className="text-[11px] text-forest font-semibold flex items-center gap-1">
                  <ShieldCheck size={13} />
                  <span>{q.verificationStatus}</span>
                </span>
              </div>

              {/* Question Statement */}
              <div className="space-y-1.5">
                <p className="font-bold text-sand-text text-sm sm:text-base leading-relaxed">
                  {useBangla ? q.questionBn : q.questionEn}
                </p>
                <p className="text-[11px] text-sand-subtext italic">
                  Citation: {q.sourceReference}
                </p>
              </div>

              {/* MCQ Options if present */}
              {q.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {q.options.map((opt) => {
                    let optStyle = 'bg-sand-muted border-sand-border text-sand-text hover:border-orange';
                    if (userMCQChoice) {
                      if (opt.key === q.correctOptionKey) {
                        optStyle = 'bg-forest-pale border-forest text-forest-deep font-bold';
                      } else if (userMCQChoice === opt.key && opt.key !== q.correctOptionKey) {
                        optStyle = 'bg-maroon-pale border-maroon text-maroon-deep font-bold';
                      } else {
                        optStyle = 'bg-sand-muted border-sand-border text-sand-subtext opacity-50';
                      }
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectMCQ(q.id, opt.key)}
                        className={`p-3 rounded-xl border text-left flex items-center gap-2.5 text-xs transition-all ${optStyle}`}
                      >
                        <span className="w-5 h-5 rounded-md bg-sand-surface border border-sand-border flex items-center justify-center font-bold text-[11px] shrink-0">
                          {opt.key}
                        </span>
                        <span>{useBangla ? opt.textBn : opt.textEn}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Formula reference */}
              {q.relevantFormulaLatex && (
                <div className="p-3 rounded-xl bg-sand-bg border border-sand-border flex items-center justify-between text-xs">
                  <span className="text-sand-subtext font-semibold">Governing Formula:</span>
                  <code className="font-mono text-orange-deep font-bold bg-orange-pale px-2 py-0.5 rounded text-[11px]">
                    {q.relevantFormulaLatex}
                  </code>
                </div>
              )}

              {/* Staged Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => toggleHint(q.id)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-sand-muted hover:bg-sand-border border border-sand-border text-sand-text transition-colors"
                >
                  <Lightbulb size={14} className="text-orange" />
                  <span>{isHintOpen ? 'Hide Hint' : 'Reveal Hint'}</span>
                </button>

                <button
                  onClick={() => toggleSolution(q.id)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-orange hover:bg-orange-deep text-white shadow-xs transition-colors"
                >
                  <CheckCircle2 size={14} />
                  <span>{isSolutionOpen ? 'Hide Full Solution' : 'Reveal Step-by-Step Solution'}</span>
                </button>
              </div>

              {/* Revealed Hint Card */}
              {isHintOpen && (
                <div className="p-4 rounded-xl bg-orange-pale/60 border border-orange-light text-xs text-orange-deep space-y-1">
                  <span className="font-bold block">Hint:</span>
                  <p className="leading-relaxed">
                    {useBangla ? q.hintBn : q.hintEn}
                  </p>
                </div>
              )}

              {/* Revealed Full Solution Card */}
              {isSolutionOpen && (
                <div className="p-5 rounded-xl bg-forest-pale/60 border border-forest-light text-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-forest-light pb-2">
                    <span className="font-bold text-forest-deep uppercase tracking-wider text-[11px]">
                      Step-by-Step Model Solution:
                    </span>
                    <span className="font-mono font-black text-forest-deep text-sm">
                      {useBangla ? q.finalAnswerBn : q.finalAnswerEn}
                    </span>
                  </div>

                  <div className="space-y-1.5 font-mono text-xs text-sand-text bg-white p-3.5 rounded-lg border border-forest-light">
                    {(useBangla ? q.solutionStepsBn : q.solutionStepsEn).map((step, idx) => (
                      <div key={idx} className="flex gap-2 leading-relaxed">
                        <span className="text-sand-subtext select-none">{idx + 1}.</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-[11px] text-forest-deep flex items-start gap-1.5">
                    <Award size={14} className="mt-0.5 shrink-0 text-forest" />
                    <span><strong>Examiner Advice:</strong> {q.examinerMarkingTips}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
