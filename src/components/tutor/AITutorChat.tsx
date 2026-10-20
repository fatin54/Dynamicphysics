'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Languages,
  BookOpen,
  Lightbulb,
  ShieldCheck,
  Zap,
  Info,
} from 'lucide-react';

interface Message {
  role: 'assistant' | 'user';
  text: string;
  banglaText?: string;
  equations?: string[];
  suggestedFollowUp?: string[];
  source?: 'Live AI (Gemini)' | 'Offline Socratic Engine';
}

export default function AITutorChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'Assalamu Alaikum! I am your HSC Dynamics AI Tutor. I can explain any concept from Chapter 3 (গতিবিদ্যা) and Chapter 4 Forces—from intuitive everyday analogies to rigorous mathematical proofs, video shortcuts, and 10-year Bangladesh board questions. What would you like to explore today?',
      banglaText: 'আসসালামু আলাইকুম! আমি তোমার এইচএসসি গতিবিদ্যা ও বলবিদ্যা শিক্ষক। ৩য় অধ্যায়ের যেকোনো কনসেপ্ট সহজ উদাহরণ থেকে শুরু করে গাণিতিক প্রমাণ, ভিডিও শর্টকাট ও বোর্ড প্রশ্নের সমাধান বুঝিয়ে দিতে পারি। আজ তুমি কোনটি শিখতে চাও?',
      suggestedFollowUp: [
        'Why does a heavier object not fall faster?',
        'How to prove the trajectory of prass is a parabola?',
        'River crossing: minimum time vs shortest distance',
        'Rain-umbrella angle when cycling at 10 m/s',
        'Why is uniform circular motion accelerated motion?',
      ],
      source: 'Offline Socratic Engine',
    },
  ]);

  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [preferBangla, setPreferBangla] = useState<boolean>(false);
  const [activeEngine, setActiveEngine] = useState<'Live AI (Gemini)' | 'Offline Socratic Engine'>('Offline Socratic Engine');

  // Curated deterministic offline physics engine
  const generateOfflineResponse = (prompt: string): Message => {
    const p = prompt.toLowerCase();

    if (p.includes('river') || p.includes('boat') || p.includes('নদী') || p.includes('নৌকা')) {
      return {
        role: 'assistant',
        text: `Here is the complete mechanics of River-Boat Crossing (নদী ও নৌকা পারাপার):\n\n1. Crossing with Minimum Time:\nTo cross as quickly as possible, point the boat perpendicular to the river bank (steering angle α = 90° to the current). In this case:\n• Crossing time: t_min = d / v (where d = river width, v = boat speed in still water).\n• Downstream drift: The river current u pushes the boat downstream by x = u · t_min.\n\n2. Crossing with Shortest Distance (Directly Opposite Bank, Zero Drift):\nTo reach the opposite pier without drifting downstream, the horizontal velocity component must cancel the current: u + v cos α = 0.\n• Steering angle: cos α = -u / v (boat heads upstream at α > 90°).\n• Resultant speed across: v_eff = √(v² - u²).\n• Crossing time: t = d / √(v² - u²).\n\nKey Feasibility Check: Zero drift is ONLY physically possible if boat speed v is greater than river speed u (v > u). If v ≤ u, the boat cannot cross straight across!`,
        banglaText: `নদী পারাপারের দুটি মূল নিয়ম:\n১. দ্রুততম সময়ে পার হওয়া: তীরের সাথে ৯০° কোণে নৌকা চালালে t_min = d / v সময় লাগে, তবে নৌকাটি ভাটির দিকে x = u · t দূরে ভেসে যায়।\n২. সোজাসুজি পার হওয়া (ন্যূনতম দূরত্ব): উজানের দিকে cos α = -u/v কোণে নৌকা চালালে নৌকা সোজাসুজি ওপারে পৌঁছাবে। কার্যকর বেগ = √(v² - u²)। শর্ত: নৌকার বেগ v > স্রোতের বেগ u হতে হবে।`,
        equations: [
          't_{\\min} = \\frac{d}{v} \\quad (\\alpha = 90^\\circ)',
          '\\cos\\alpha = -\\frac{u}{v} \\implies v_{\\text{eff}} = \\sqrt{v^2 - u^2} \\quad (\\text{Shortest Path})',
        ],
        suggestedFollowUp: [
          'What happens if boat speed is less than river current?',
          'How to calculate rain umbrella angle for a cyclist?',
        ],
        source: 'Offline Socratic Engine',
      };
    } else if (p.includes('rain') || p.includes('umbrella') || p.includes('বৃষ্টি') || p.includes('ছাতা')) {
      return {
        role: 'assistant',
        text: `Here is how to calculate the Umbrella Angle for a moving person in rain:\n\n1. Relative Velocity Concept:\nWhen rain falls vertically with velocity \\vec{v}_r = -v_r \\hat{j} and a person walks horizontally with velocity \\vec{v}_p = v_p \\hat{i}, the relative velocity of rain as felt by the person is:\n\\vec{v}_{\\text{rel}} = \\vec{v}_r - \\vec{v}_p = -v_p \\hat{i} - v_r \\hat{j}.\n\n2. Umbrella Tilt Angle:\nThe person must tilt the umbrella into the oncoming relative rain vector. Measuring angle θ with respect to the VERTICAL:\n\\tan\\theta = \\frac{|\\vec{v}_p|}{|\\vec{v}_r|} = \\frac{v_{\\text{person}}}{v_{\\text{rain}}}.\n\n3. Apparent Rain Impact Speed:\nv_{\\text{rel}} = \\sqrt{v_{\\text{rain}}^2 + v_{\\text{person}}^2}.\n\nExaminer Tip: Always state explicitly that the angle θ is measured from the vertical! If measured from the horizontal ground, the angle is (90° - θ).`,
        banglaText: `বৃষ্টির মধ্যে ছাতা ধরার নিয়ম:\nবৃষ্টি খাড়া নিচে পড়লে এবং ব্যক্তি v_p বেগে সামনে হাঁটলে বৃষ্টির আপেক্ষিক বেগ ব্যক্তিটির দিকে হেলে যায়।\nউলম্বের সাথে ছাতার কোণ: tan θ = v_ব্যক্তি / v_বৃষ্টি।\nআপেক্ষিক আঘাতের দ্রুতি: v_rel = √(v_বৃষ্টি² + v_ব্যক্তি²)।`,
        equations: [
          '\\tan\\theta = \\frac{v_{\\text{person}}}{v_{\\text{rain}}} \\quad (\\theta \\text{ measured from vertical})',
          'v_{\\text{rel}} = \\sqrt{v_{\\text{rain}}^2 + v_{\\text{person}}^2}',
        ],
        suggestedFollowUp: [
          'What if wind is also blowing in the same direction?',
          'Explain river boat crossing',
        ],
        source: 'Offline Socratic Engine',
      };
    } else if (p.includes('heavier') || p.includes('fall') || p.includes('galileo') || p.includes('ভারী') || p.includes('পড়ন্ত')) {
      return {
        role: 'assistant',
        text: `Here is why heavier objects do NOT fall faster in a vacuum:\n\n1. Newton's 2nd Law states: a = F_net / m.\n\n2. The Gravitational Force on mass m is F = mg. A 10 kg iron ball experiences 10 times more downward force than a 1 kg ball.\n\n3. BUT the 10 kg ball also possesses 10 times more INERTIA (resistance to acceleration)! Dividing force by mass gives:\na = (m g) / m = g = 9.8 m/s².\n\nThe mass m cancels out completely! All freely falling objects accelerate at the exact same rate g = 9.8 m/s² regardless of weight. Feathers fall slower in air solely because of aerodynamic air resistance, as demonstrated by the Apollo 15 astronaut dropping a hammer and feather on the Moon.`,
        banglaText: `বায়ুশূন্য স্থানে ভারী বস্তু কেন বেশি দ্রুত পড়ে না:\n১. নিউটনের ২য় সূত্র: a = F / m।\n২. ১০ কেজি বস্তুর উপর পৃথিবীর আকর্ষণ বল ১ কেজির চেয়ে ১০ গুণ বেশি।\n৩. কিন্তু ১০ কেজি বস্তুর জড়তাও ঠিক ১০ গুণ বেশি! ভাগ করলে ভর m কাটাকাটি হয়ে যায়:\na = (mg) / m = g = ৯.৮ m/s²।\nসুতরাং সব বস্তু সমান ত্বরণে নিচে পড়ে।`,
        equations: ['a = \\frac{F}{m} = \\frac{mg}{m} = g = 9.8 \\text{ m/s}^2'],
        suggestedFollowUp: [
          'State Galileo\'s three laws of falling bodies',
          'What is the stone drop equation from an ascending balloon?',
        ],
        source: 'Offline Socratic Engine',
      };
    } else if (p.includes('projectile') || p.includes('prass') || p.includes('parabola') || p.includes('প্রাস') || p.includes('পরাবৃত্ত')) {
      return {
        role: 'assistant',
        text: `Let's break down Projectile Motion (প্রাস) with complete mathematical rigor:\n\n1. Independence of Motions:\n• Horizontal Motion: a_x = 0 (no gravity horizontally), so horizontal velocity remains strictly constant: v_x = v_0 cos θ_0; x = (v_0 cos θ_0) t.\n• Vertical Motion: a_y = -g, so vertical velocity decelerates going up and accelerates down: v_y = v_0 sin θ_0 - gt; y = (v_0 sin θ_0)t - 0.5gt².\n\n2. Proof of Parabolic Trajectory:\nExpress time from horizontal motion: t = x / (v_0 cos θ_0).\nSubstitute t into the vertical equation:\ny = (tan θ_0) x - [g / (2 v_0² cos² θ_0)] x².\nBecause y is a quadratic function of x with a negative x² coefficient, the path is a Parabola!\n\n3. Core Projectile Formulas:\n• Maximum Height: H = (v_0² sin² θ_0) / 2g\n• Time of Flight: T = (2 v_0 sin θ_0) / g\n• Horizontal Range: R = (v_0² sin 2θ_0) / g (Maximum at θ_0 = 45°)\n• Complementary Angle Identity: R(θ) = R(90° - θ)`,
        banglaText: `প্রাসের গতিপথ পরাবৃত্ত হওয়ার কারণ:\nঅনুভূমিক দিকে ত্বরণ নেই (ax = 0), তাই vx = v0 cos θ0 সমবেগ। উলম্ব দিকে অভিকর্ষ ত্বরণ ay = -g।\nসময় t অপনয়ন করলে পাওয়া যায়: y = (tan θ0)x - [g/(2v0² cos² θ0)]x² যা একটি পরাবৃত্তের সমীকরণ।\nপাল্লা R = (v0² sin 2θ0)/g এবং ৪৫° কোণে পাল্লা সর্বোচ্চ হয়।`,
        equations: [
          'y = x \\tan\\theta_0 - \\left( \\frac{g}{2 v_0^2 \\cos^2\\theta_0} \\right) x^2',
          'H = \\frac{v_0^2 \\sin^2\\theta_0}{2g}, \\quad T = \\frac{2 v_0 \\sin\\theta_0}{g}, \\quad R = \\frac{v_0^2 \\sin 2\\theta_0}{g}',
        ],
        suggestedFollowUp: [
          'Prove R = 4 * sqrt(H1 * H2) for complementary angles',
          'How to check if a ball clears a wall 85m away?',
        ],
        source: 'Offline Socratic Engine',
      };
    } else if (p.includes('circular') || p.includes('কৌণিক') || p.includes('বৃত্তীয়')) {
      return {
        role: 'assistant',
        text: `Why is Uniform Circular Motion accelerated motion even though speed is constant?\n\n1. Velocity is a Vector:\nAcceleration is the time rate of change of VELOCITY: \\vec{a} = d\\vec{v}/dt. Velocity has two independent attributes: magnitude (speed) and direction.\n\n2. Continuous Direction Change:\nIn circular motion, the speed |v| may stay constant, but the direction of velocity changes continuously at every point along the circular arc.\n\n3. Inward Centripetal Acceleration:\nTo continuously bend a straight velocity vector into a curved circle, an inward acceleration directed toward the center is required:\na_c = v² / r = ω² r.\n\nKey Relationship: Linear speed v = ω r, where angular velocity ω = 2π/T = 2πf.`,
        banglaText: `সুষম বৃত্তীয় গতিতে দ্রুতি ধ্রুব হলেও কেন ত্বরণ থাকে?\nবেগ একটি ভেক্টর রাশি যার মান ও দিক উভয়ই আছে। বৃত্তাকার পথে ঘুরলে প্রতি মুহূর্তে বেগের দিক পরিবর্তিত হয়। এই দিক পরিবর্তনের জন্যই সর্বদা কেন্দ্রের দিকে কেন্দ্রমুখী ত্বরণ a_c = v²/r বা ω²r সৃষ্টি হয়।`,
        equations: [
          'v = \\omega r, \\quad \\omega = \\frac{2\\pi}{T} = 2\\pi f',
          'a_c = \\frac{v^2}{r} = \\omega^2 r',
        ],
        suggestedFollowUp: [
          'What is the angular speed of a clock second hand?',
          'What is the difference between centripetal and centrifugal force?',
        ],
        source: 'Offline Socratic Engine',
      };
    } else if (p.includes('graph') || p.includes('slope') || p.includes('area') || p.includes('লেখচিত্র')) {
      return {
        role: 'assistant',
        text: `Here is the master key to Kinematic Graphs (s-t, v-t, a-t):\n\n1. Slope (Derivative):\n• Slope of s-t graph (ds/dt) = Instantaneous Velocity v.\n• Slope of v-t graph (dv/dt) = Instantaneous Acceleration a.\n\n2. Area (Integral):\n• Area under v-t graph (∫ v dt) = Displacement s.\n• Area under a-t graph (∫ a dt) = Change in Velocity Δv = v - u.\n\nExaminer Trap: If the v-t graph dips below the time axis (negative velocity), the area under the axis represents negative displacement (moving backward). To find TOTAL DISTANCE, add the absolute values of the areas!`,
        banglaText: `গতির লেখচিত্রের সারসংক্ষেপ:\n১. s-t লেখচিত্রের ঢাল = বেগ v\n২. v-t লেখচিত্রের ঢাল = ত্বরণ a\n৩. v-t লেখচিত্রের ক্ষেত্রফল = সরণ s\n৪. a-t লেখচিত্রের ক্ষেত্রফল = বেগের পরিবর্তন Δv`,
        equations: [
          'v = \\frac{ds}{dt}, \\quad a = \\frac{dv}{dt}, \\quad s = \\int v dt',
        ],
        suggestedFollowUp: [
          'How to find distance from a trapezoid v-t graph?',
          'Explain projectile motion',
        ],
        source: 'Offline Socratic Engine',
      };
    } else {
      return {
        role: 'assistant',
        text: `That is an interesting topic in dynamics! Let's approach it systematically:\n\n1. Reference Frame: What observer are we measuring from? Are we in an inertial frame?\n2. Kinematics: Is acceleration constant? If so, apply the 4 rectilinear equations (v = u + at, s = ut + 0.5at², v² = u² + 2as).\n3. 2D Vectors: For projectiles or river boats, resolve into independent x and y components.\n4. Forces & Momentum: If mass and forces are involved, set up a Free-Body Diagram and apply F_net = ma or momentum conservation.\n\nAsk me specifically about: Projectiles (প্রাস), River-Boat Crossing, Rain-Umbrella Angle, Free Fall, Motion Graphs, or Board Creative Questions!`,
        banglaText: `গতিবিদ্যার যেকোনো সমস্যা সমাধানের ধাপ:\n১. প্রসঙ্গ কাঠামো ও অক্ষ চিহ্নিত করো।\n২. ত্বরণ ধ্রুব হলে গতির সমীকরণ প্রয়োগ করো।\n৩. নদী-নৌকা বা প্রাসের ক্ষেত্রে ভেক্টর বিভাজন (x ও y) ব্যবহার করো।`,
        suggestedFollowUp: [
          'Explain river boat crossing minimum time',
          'Prove trajectory of prass is a parabola',
          'Why do heavier objects not fall faster?',
        ],
        source: 'Offline Socratic Engine',
      };
    }
  };

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const userMsg: Message = { role: 'user', text: trimmedInput };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Attempt to call Cloudflare Pages Functions server endpoint /api/tutor
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmedInput,
          preferBangla,
          history: messages.slice(-4).map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.liveAI && data.text) {
          setActiveEngine('Live AI (Gemini)');
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              text: data.text,
              source: 'Live AI (Gemini)',
              suggestedFollowUp: [
                'Can you explain this with a practical everyday example?',
                'What is the standard board exam question on this?',
              ],
            },
          ]);
          setIsTyping(false);
          return;
        }
      }
    } catch {
      // In local static mode or network failure, gracefully fall back
    }

    // Fallback to deterministic curated Socratic engine
    setActiveEngine('Offline Socratic Engine');
    setTimeout(() => {
      const fallbackMsg = generateOfflineResponse(trimmedInput);
      setMessages((prev) => [...prev, fallbackMsg]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <div className="bg-sand-surface rounded-2xl border border-sand-border shadow-sm flex flex-col h-[680px] overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-maroon-pale border-b border-maroon-light flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-maroon text-white flex items-center justify-center shadow-xs">
            <Sparkles size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-maroon-deep">
                HSC Dynamics AI Physics Tutor
              </h3>
              <span
                className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold border flex items-center gap-1 ${
                  activeEngine === 'Live AI (Gemini)'
                    ? 'bg-forest-pale text-forest-deep border-forest-light'
                    : 'bg-orange-pale text-orange-deep border-orange-light'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    activeEngine === 'Live AI (Gemini)' ? 'bg-forest animate-pulse' : 'bg-orange'
                  }`}
                />
                <span>{activeEngine}</span>
              </span>
            </div>
            <p className="text-[11px] text-maroon">
              Trained on NCTB Chapter 3 (Shahjahan Tapan &amp; Ishak Sir)
            </p>
          </div>
        </div>

        {/* Bilingual View Toggle */}
        <button
          onClick={() => setPreferBangla(!preferBangla)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-maroon-light text-maroon hover:bg-maroon hover:text-white transition-all shadow-2xs"
        >
          <Languages size={13} />
          <span>{preferBangla ? 'English Mode' : 'বাংলায় দেখুন'}</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
        {messages.map((msg, idx) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={idx}
              className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isUser ? 'bg-orange text-white' : 'bg-maroon text-white'
                }`}
              >
                {isUser ? <User size={14} /> : <Bot size={14} />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 leading-relaxed whitespace-pre-line ${
                  isUser
                    ? 'bg-orange text-white rounded-tr-xs shadow-xs'
                    : 'bg-sand-muted border border-sand-border text-sand-text rounded-tl-xs shadow-2xs'
                }`}
              >
                {/* Source Badge on Assistant Messages */}
                {!isUser && msg.source && (
                  <div className="mb-2 flex items-center gap-1.5 text-[10px] text-sand-subtext font-semibold">
                    <ShieldCheck size={11} className="text-forest" />
                    <span>{msg.source}</span>
                  </div>
                )}

                <p>{preferBangla && msg.banglaText ? msg.banglaText : msg.text}</p>

                {/* Display LaTeX equations if present */}
                {msg.equations && (
                  <div className="my-2.5 p-2 rounded-lg bg-sand-surface border border-sand-border font-mono font-bold text-orange-deep text-[11px] overflow-x-auto">
                    {msg.equations.map((eq, i) => (
                      <div key={i}>{eq}</div>
                    ))}
                  </div>
                )}

                {/* Suggested follow-up prompt pills */}
                {msg.suggestedFollowUp && (
                  <div className="mt-3 pt-2.5 border-t border-sand-border/50 flex flex-wrap gap-1.5">
                    {msg.suggestedFollowUp.map((fu, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setInput(fu);
                        }}
                        className="text-[10px] px-2 py-1 rounded-lg bg-sand-surface border border-sand-border text-sand-text hover:border-orange hover:text-orange-deep transition-colors"
                      >
                        {fu}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-maroon text-white flex items-center justify-center shrink-0">
              <Bot size={14} />
            </div>
            <div className="bg-sand-muted p-3 rounded-2xl rounded-tl-xs flex items-center gap-1.5 border border-sand-border">
              <span className="text-[11px] text-sand-subtext mr-1">Thinking...</span>
              <div className="w-1.5 h-1.5 rounded-full bg-orange animate-bounce" />
              <div className="w-1.5 h-1.5 rounded-full bg-orange animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 rounded-full bg-orange animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Input box */}
      <div className="p-3 bg-sand-surface border-t border-sand-border">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything (e.g. 'Prove parabola', 'River boat minimum time', 'Rain umbrella angle')..."
            className="flex-1 bg-sand-muted border border-sand-border rounded-xl px-4 py-2.5 text-xs text-sand-text focus:outline-hidden focus:border-orange placeholder-sand-subtext"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-2.5 rounded-xl bg-orange hover:bg-orange-deep text-white shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}
