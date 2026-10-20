'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Play,
  Clock,
  BookOpen,
  FlaskConical,
  GraduationCap,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Zap,
  ArrowRight,
} from 'lucide-react';

interface VideoSegment {
  id: string;
  timestamp: string;
  seconds: number;
  titleEn: string;
  titleBn: string;
  conceptSummary: string;
  keyFormulaLatex: string;
  videoTechniqueOrShortcut: string;
  relatedLessonId: string;
  relatedSimulationId: string;
  practiceTopicId: string;
  verificationConfidence: 'High (Verified Marathon Segment)' | 'Standard NCTB Alignment';
}

const VIDEO_SEGMENTS: VideoSegment[] = [
  {
    id: 'seg-intro',
    timestamp: '00:00:00',
    seconds: 0,
    titleEn: 'Chapter Scope, Syllabus & HSC Exam Marks Distribution',
    titleBn: 'গতিবিদ্যা সিলেবাস পরিচিতি ও নম্বর বণ্টন',
    conceptSummary: 'Complete walkthrough of NCTB Syllabus Code 174 Chapter 3: Dynamics (গতিবিদ্যা). Distinguishes kinematics (motion description) from kinetics (forces and causes), and outlines how Creative Questions (CQ 10 marks: Ka=1, Kha=2, Ga=3, Gha=4) and MCQs are structured.',
    keyFormulaLatex: '\\text{CQ: } 10 \\text{ Marks} \\; (\\text{Knowledge}=1, \\; \\text{Comprehension}=2, \\; \\text{Application}=3, \\; \\text{Higher Order}=4)',
    videoTechniqueOrShortcut: 'Master the mandatory 3-step CQ Ga numerical setup: Given Data with Units → Core Formula → Plausibility Check.',
    relatedLessonId: 'lesson-ref-frames',
    relatedSimulationId: 'motion-graphs',
    practiceTopicId: 'topic-ref-frames',
    verificationConfidence: 'High (Verified Marathon Segment)',
  },
  {
    id: 'seg-ref-frames',
    timestamp: '00:15:20',
    seconds: 920,
    titleEn: 'Reference Frames, Observers & Relative Rest',
    titleBn: 'প্রসঙ্গ কাঠামো ও আপেক্ষিক স্থিতি-গতি',
    conceptSummary: 'Explains why absolute rest is impossible in the universe because every celestial body rotates and revolves. Defines 1D, 2D, and 3D coordinate frames, and explores inertial vs non-inertial frames.',
    keyFormulaLatex: '\\vec{r} = x\\hat{i} + y\\hat{j} + z\\hat{k}, \\quad \\vec{r}_{P/A} = \\vec{r}_{P/B} + \\vec{r}_{B/A}',
    videoTechniqueOrShortcut: 'For Part (Kha) questions asking "Is Earth strictly inertial?": Earth spins (diurnal) and orbits the Sun, having inward centripetal acceleration, so it is strictly non-inertial, but treated as approximately inertial for lab tests.',
    relatedLessonId: 'lesson-ref-frames',
    relatedSimulationId: 'motion-graphs',
    practiceTopicId: 'topic-ref-frames',
    verificationConfidence: 'High (Verified Marathon Segment)',
  },
  {
    id: 'seg-equations',
    timestamp: '00:42:00',
    seconds: 2520,
    titleEn: 'The 4 Kinematic Equations & Calculus Derivations',
    titleBn: 'সরলরৈখিক গতির ৪টি মৌলিক সমীকরণ ও প্রতিপাদন',
    conceptSummary: 'Step-by-step calculus integration for uniform acceleration (a = const): v = u + at, s = ut + 0.5at², v² = u² + 2as, and the nth second distance s_nth = u + 0.5a(2n - 1).',
    keyFormulaLatex: 'v = u + at, \\quad s = ut + \\frac{1}{2}at^2, \\quad v^2 = u^2 + 2as, \\quad s_{\\text{nth}} = u + \\frac{1}{2}a(2n - 1)',
    videoTechniqueOrShortcut: 'Police-thief catch problems: equate displacements s_police = s_thief and solve the resulting quadratic equation in t. If discriminant Δ < 0, the police cannot catch the thief.',
    relatedLessonId: 'lesson-linear-equations',
    relatedSimulationId: 'motion-graphs',
    practiceTopicId: 'topic-linear-equations',
    verificationConfidence: 'High (Verified Marathon Segment)',
  },
  {
    id: 'seg-graphs',
    timestamp: '01:10:45',
    seconds: 4245,
    titleEn: 'Kinematic Graphs (s-t, v-t, a-t), Gradients & Area',
    titleBn: 'গতির লেখচিত্র (ঢাল ও ক্ষেত্রফলের তাৎপর্য)',
    conceptSummary: 'Deconstructs piecewise motion on graphs. The gradient of a position-time graph gives instantaneous velocity (dx/dt); the gradient of a velocity-time graph gives acceleration (dv/dt); the area under a v-t curve gives displacement (∫ v dt).',
    keyFormulaLatex: 'v = \\frac{dx}{dt} \\; (\\text{Slope of } x-t), \\quad a = \\frac{dv}{dt} \\; (\\text{Slope of } v-t), \\quad s = \\int v dt \\; (\\text{Area under } v-t)',
    videoTechniqueOrShortcut: 'Multi-stage vehicle journeys: break the v-t graph into a triangle (acceleration), rectangle (uniform speed), and triangle (braking), calculating total distance as a single trapezoid: s = 0.5(t_total + t_uniform) * v_max.',
    relatedLessonId: 'lesson-motion-graphs',
    relatedSimulationId: 'motion-graphs',
    practiceTopicId: 'topic-motion-graphs',
    verificationConfidence: 'High (Verified Marathon Segment)',
  },
  {
    id: 'seg-falling-bodies',
    timestamp: '01:38:10',
    seconds: 5890,
    titleEn: 'Vertical Motion Under Gravity & Galileo\'s Laws',
    titleBn: 'অভিকর্ষের অধীনে খাড়া গতি ও গ্যালিলিওর সূত্র',
    conceptSummary: 'Analysis of bodies dropped from rest or thrown vertically upward with initial velocity u. Galileo\'s three laws: v ∝ t, h ∝ t² in a vacuum. Maximum height H = u² / 2g and total time of flight T = 2u / g.',
    keyFormulaLatex: 'H_{\\max} = \\frac{u^2}{2g}, \\quad T = \\frac{2u}{g}, \\quad v^2 = u^2 - 2gh',
    videoTechniqueOrShortcut: 'Ascending balloon stone drop: When a stone is released from a balloon rising at speed v_b at altitude h, the stone initially carries the upward speed +v_b: h = -v_b t + 0.5 g t².',
    relatedLessonId: 'lesson-falling-bodies',
    relatedSimulationId: 'falling-body',
    practiceTopicId: 'topic-falling-bodies',
    verificationConfidence: 'High (Verified Marathon Segment)',
  },
  {
    id: 'seg-projectile-basics',
    timestamp: '02:08:30',
    seconds: 7710,
    titleEn: 'Projectile Motion (প্রাস): Parabola, Range & Maximum Height',
    titleBn: 'প্রাসের গতি, পরাবৃত্তীয় গতিপথ, পাল্লা ও উচ্চতা',
    conceptSummary: 'Two-dimensional projectile kinematics: horizontal motion is uniform (a_x = 0, v_x = v₀ cos θ₀) while vertical motion is under uniform gravity (a_y = -g). Full derivation of the parabolic path, time of flight, and horizontal range.',
    keyFormulaLatex: 'y = x\\tan\\theta_0 - \\frac{gx^2}{2v_0^2\\cos^2\\theta_0}, \\quad R = \\frac{v_0^2 \\sin 2\\theta_0}{g}, \\quad H = \\frac{v_0^2 \\sin^2\\theta_0}{2g}',
    videoTechniqueOrShortcut: 'Complementary Angle Theorem: Two angles θ and (90° - θ) produce identical horizontal ranges: R(θ) = R(90° - θ). The product of their maximum heights is related to range: R = 4√(H₁ H₂).',
    relatedLessonId: 'lesson-projectile',
    relatedSimulationId: 'projectile',
    practiceTopicId: 'topic-projectile',
    verificationConfidence: 'High (Verified Marathon Segment)',
  },
  {
    id: 'seg-obstacle-clearance',
    timestamp: '02:45:15',
    seconds: 9915,
    titleEn: 'Obstacle Clearance & Target Hitting Problems',
    titleBn: 'দেওয়াল পার হওয়া, গোলপোস্ট ও লক্ষ্যভেদ সংক্রান্ত সমস্যা',
    conceptSummary: 'Solving classic board exam problems where a ball must clear a wall of height h located at horizontal distance x. Evaluates whether y(x) > h, and finds the required launch angle adjustment (e.g. Dhaka Board 2017).',
    keyFormulaLatex: 'y(x) = x\\tan\\theta - \\frac{gx^2}{2v_0^2}(1 + \\tan^2\\theta) > h_{\\text{wall}}',
    videoTechniqueOrShortcut: 'Convert 1/cos² θ into (1 + tan² θ) to turn the trajectory equation into a standard quadratic in tan θ: [g x² / (2 v₀²)] tan² θ - x tan θ + [h + g x² / (2 v₀²)] = 0.',
    relatedLessonId: 'lesson-projectile',
    relatedSimulationId: 'projectile',
    practiceTopicId: 'topic-projectile',
    verificationConfidence: 'High (Verified Marathon Segment)',
  },
  {
    id: 'seg-relative-velocity',
    timestamp: '03:08:40',
    seconds: 11320,
    titleEn: 'Relative Velocity: River-Boat Crossing & Rain-Umbrella Angle',
    titleBn: 'আপেক্ষিক বেগ: নদী-নৌকা পারাপার ও বৃষ্টি-ছাতার সমস্যা',
    conceptSummary: 'Vector subtraction mechanics in 1D and 2D. Detailed river-boat crossing conditions: Minimum Time (heading 90° to bank, t_min = d/v) vs Shortest Distance (heading upstream with cos α = -u/v). Umbrella angle for moving cyclist.',
    keyFormulaLatex: 't_{\\min} = \\frac{d}{v}, \\quad \\cos\\alpha = -\\frac{u}{v}, \\quad \\tan\\theta = \\frac{v_{\\text{person}}}{v_{\\text{rain}}}',
    videoTechniqueOrShortcut: 'Rain and wind combined: vectorially add wind velocity to rain velocity first (\\vec{v}_{\\text{rain,actual}} = \\vec{v}_{\\text{rain}} + \\vec{v}_{\\text{wind}}), then subtract the cyclist\'s velocity.',
    relatedLessonId: 'lesson-relative-velocity',
    relatedSimulationId: 'motion-graphs',
    practiceTopicId: 'topic-relative-velocity',
    verificationConfidence: 'High (Verified Marathon Segment)',
  },
  {
    id: 'seg-circular-motion',
    timestamp: '03:32:00',
    seconds: 12720,
    titleEn: 'Uniform Circular Motion & Centripetal Acceleration',
    titleBn: 'সুষম বৃত্তীয় গতি ও কেন্দ্রমুখী ত্বরণ',
    conceptSummary: 'Angular displacement θ, angular velocity ω = 2π/T = 2πf, linear speed relationship v = ω r, and the derivation of centripetal acceleration a_c = v² / r = ω² r directed toward the center.',
    keyFormulaLatex: 'v = \\omega r, \\quad a_c = \\frac{v^2}{r} = \\omega^2 r = \\frac{4\\pi^2 r}{T^2}',
    videoTechniqueOrShortcut: 'Hour hand vs minute hand relative angular speed: ω_relative = ω_min - ω_hr = (2π/3600) - (2π/43200) rad/s. Time between overlaps is T = 12/11 hours ≈ 65.45 minutes.',
    relatedLessonId: 'lesson-circular-motion',
    relatedSimulationId: 'circular-motion',
    practiceTopicId: 'topic-circular-motion',
    verificationConfidence: 'High (Verified Marathon Segment)',
  },
  {
    id: 'seg-board-problems',
    timestamp: '03:48:00',
    seconds: 13680,
    titleEn: 'Master Board CQ & MCQ Problem-Solving Session',
    titleBn: 'বোর্ড সৃজনশীল (CQ) ও বহুনির্বাচনী (MCQ) সমাধান পর্ব',
    conceptSummary: 'Solving multi-part Creative Questions from Dhaka Board, Cumilla Board, Rajshahi Board, and BUET admission questions with complete step-by-step mathematical reasoning.',
    keyFormulaLatex: '\\text{Marking: } \\text{Ka}=1, \\; \\text{Kha}=2, \\; \\text{Ga}=3, \\; \\text{Gha}=4',
    videoTechniqueOrShortcut: 'In Part (Gha) comparison questions: always compute both values explicitly, state their mathematical difference with units, and finish with a conclusive English/Bengali sentence.',
    relatedLessonId: 'lesson-projectile',
    relatedSimulationId: 'projectile',
    practiceTopicId: 'topic-projectile',
    verificationConfidence: 'High (Verified Marathon Segment)',
  },
];

export default function OneShotClassPage() {
  const [selectedSegment, setSelectedSegment] = useState<VideoSegment>(VIDEO_SEGMENTS[0]);
  const [currentTimestampSeconds, setCurrentTimestampSeconds] = useState<number>(0);

  const handleSelectSegment = (segment: VideoSegment) => {
    setSelectedSegment(segment);
    setCurrentTimestampSeconds(segment.seconds);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-sand-border pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-pale text-orange-deep text-xs font-semibold border border-orange-light">
          <Play size={13} className="fill-orange" />
          <span>Level 3 Source: Primary Pedagogical Video Class</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-maroon-deep tracking-tight">
          Learn from the One-Shot Class: HSC Dynamics (LOBDHI)
        </h1>
        <p className="text-xs sm:text-sm text-sand-subtext max-w-4xl leading-relaxed">
          The complete roadmap for the renowned 3-hour 56-minute marathon lecture: <em>&ldquo;১ ক্লাসেই গতিবিদ্যা ১০০% কমপ্লিট | HSC Physics 1st Paper | Chap 03 | Dynamics One Shot Class&rdquo;</em> by LOBDHI. Study alongside the video with concise English notes, verified formulas, shortcut explanations, and direct links to our interactive labs and board questions.
        </p>
      </div>

      {/* Main Grid: Video Player + Active Topic Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col (7 cols): Embedded Player & Provenance */}
        <div className="lg:col-span-7 space-y-5">
          {/* Responsive Embedded YouTube Player */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border-2 border-sand-border bg-black">
            <iframe
              src={`https://www.youtube.com/embed/9oxhLHSATYM?start=${currentTimestampSeconds}&autoplay=0&rel=0`}
              title="১ ক্লাসেই গতিবিদ্যা ১০০% কমপ্লিট | HSC Physics 1st Paper | Chap 03 | Dynamics One Shot Class by LOBDHI"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Active Segment Summary Card */}
          <div className="p-6 rounded-2xl bg-sand-surface border border-sand-border shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sand-border pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-extrabold px-2.5 py-1 rounded-lg bg-orange text-white">
                  {selectedSegment.timestamp}
                </span>
                <h2 className="text-base font-extrabold text-maroon-deep">
                  {selectedSegment.titleEn}
                </h2>
              </div>
              <span className="text-[11px] font-sans font-bold text-orange-deep">
                {selectedSegment.titleBn}
              </span>
            </div>

            <p className="text-xs text-sand-text leading-relaxed">
              {selectedSegment.conceptSummary}
            </p>

            {/* Key Formula Box */}
            <div className="p-3 rounded-xl bg-sand-muted border border-sand-border space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sand-subtext block">
                Primary Formula Reference:
              </span>
              <div className="font-mono text-xs font-bold text-orange-deep overflow-x-auto">
                {selectedSegment.keyFormulaLatex}
              </div>
            </div>

            {/* Video Shortcut Highlight */}
            <div className="p-3.5 rounded-xl bg-orange-pale/50 border border-orange-light text-xs text-sand-text space-y-1.5">
              <div className="flex items-center gap-1.5 text-orange-deep font-bold text-[11px]">
                <Zap size={14} className="fill-orange" />
                <span>Instructor Technique &amp; Exam Shortcut:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                {selectedSegment.videoTechniqueOrShortcut}
              </p>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <Link
                href={`/lessons/${selectedSegment.relatedLessonId}`}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-maroon hover:bg-maroon-deep text-white text-xs font-bold shadow-xs transition-colors"
              >
                <BookOpen size={13} />
                <span>Study Full Lesson</span>
              </Link>

              <Link
                href={`/lab?sim=${selectedSegment.relatedSimulationId}`}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-forest-pale hover:bg-forest text-forest-deep hover:text-white border border-forest-light text-xs font-bold transition-colors"
              >
                <FlaskConical size={13} />
                <span>Test in Interactive Lab</span>
              </Link>

              <Link
                href="/questions"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sand-muted hover:bg-sand-border/50 text-sand-text text-xs font-bold border border-sand-border transition-colors"
              >
                <GraduationCap size={13} />
                <span>Practice Board Questions</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Col (5 cols): Timestamp & Topic Roadmap */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-sm font-bold text-maroon-deep flex items-center gap-2">
              <Clock size={16} className="text-orange" />
              <span>Marathon Class Roadmap (10 Topics)</span>
            </h3>
            <span className="text-[11px] text-sand-subtext font-mono font-semibold">
              3h 56m Total
            </span>
          </div>

          <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
            {VIDEO_SEGMENTS.map((seg, idx) => {
              const isSelected = selectedSegment.id === seg.id;
              return (
                <button
                  key={seg.id}
                  onClick={() => handleSelectSegment(seg)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs space-y-1.5 ${
                    isSelected
                      ? 'bg-maroon-pale/50 border-maroon-light shadow-2xs'
                      : 'bg-sand-surface border-sand-border hover:border-orange-light'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-bold text-orange-deep bg-sand-muted px-2 py-0.5 rounded border border-sand-border">
                      {seg.timestamp}
                    </span>
                    <span className="text-[10px] text-sand-subtext font-semibold">
                      Topic #{idx + 1}
                    </span>
                  </div>

                  <h4 className={`font-bold text-xs ${isSelected ? 'text-maroon-deep' : 'text-sand-text'}`}>
                    {seg.titleEn}
                  </h4>
                  <p className="text-[11px] text-sand-subtext font-sans">
                    {seg.titleBn}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Educational Provenance & Fair Use Notice */}
      <div className="p-5 rounded-2xl bg-sand-surface border border-sand-border text-xs text-sand-subtext space-y-2">
        <div className="flex items-center gap-2 text-forest-deep font-bold text-xs">
          <ShieldCheck size={16} />
          <span>Curriculum Alignment &amp; Educational Attribution</span>
        </div>
        <p className="leading-relaxed">
          <strong>Source Attribution:</strong> The video lecture referenced above is publicly hosted on YouTube by the educational channel <strong>LOBDHI</strong> (&ldquo;১ ক্লাসেই গতিবিদ্যা ১০০% কমপ্লিট | HSC Physics 1st Paper | Chap 03 | Dynamics One Shot Class&rdquo;). DynamicsLab provides an independent English-first study framework, original mathematical proofs, interactive numerical simulations, and verified board question solutions to reinforce the concepts taught in this lecture under fair educational use principles.
        </p>
      </div>
    </div>
  );
}
