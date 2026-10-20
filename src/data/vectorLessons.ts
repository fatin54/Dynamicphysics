import { Lesson } from '@/types';

export const VECTOR_LESSONS: Lesson[] = [
  // =========================================================================
  // TYPE 1: DOT PRODUCT & CROSS PRODUCT
  // =========================================================================
  {
    id: 'lesson-vector-dot-cross',
    topicId: 'topic-vector-dot-cross',
    sectionNumber: '২.৭ ও ২.৮',
    titleEn: 'Type 1: Dot Product & Cross Product',
    titleBn: 'টাইপ ১: ডট গুণন ও ক্রস গুণন',
    category: 'vector-dot-cross',
    isOfficialChapter3: false,
    estimatedMinutes: 25,
    layerA_Intuitive: {
      everydayScenario: 'Imagine dragging a heavy luggage bag along an airport walkway. You pull the handle at a 45° angle. Only the horizontal part of your pull moves the bag forward—the upward part does nothing to push it along the floor. In contrast, when you tighten a nut with a wrench, you must push perpendicular to the handle to twist it. Parallel pushing gives zero turn!',
      banglaScenario: 'বিমানবন্দরে ট্রলি ব্যাগ টানার কথা ভাবো। তুমি হাতল ধরে ৪৫° কোণে টানছো। শুধুমাত্র অনুভূমিক উপাংশটি ব্যাগকে সামনের দিকে এগিয়ে নিয়ে যায়। আবার যখন রেঞ্চ দিয়ে নাট টাইট দাও, তখন হাতলের সাথে লম্বভাবে বল দিলে নাট ঘোরে; সোজা হাতল বরাবর টানলে নাট একটুও ঘোরে না!',
      coreIdea: 'Nature has two distinct ways vectors interact: The Dot Product measures mutual alignment (how much they cooperate along the same line to create a scalar effect like Work). The Cross Product measures perpendicular leverage (how much they create rotation or sweep an area into a 3rd dimension to create a vector effect like Torque).',
      banglaCoreIdea: 'ভেক্টরের মধ্যে দুটি মূল মিথস্ক্রিয়া রয়েছে: ডট গুণন পরিমাপ করে দুটি ভেক্টরের পারস্পরিক সংগতি বা সমমুখী প্রভাব (যেমন বল ও সরণের ডট গুণন কাজ দেয়, যা স্কেলার)। আর ক্রস গুণন পরিমাপ করে লম্ব প্রভাব ও ঘূর্ণন প্রবণতা (যেমন ব্যাসার্ধ ও বলের ক্রস গুণন টর্ক দেয়, যা ভেক্টর)।',
      analogy: 'Dot product is like walking in the direction of the wind (maximum boost when parallel). Cross product is like a revolving glass door: you push sideways at 90° to make it spin.',
      keyObservation: 'If two vectors are at 90°, their dot product is 0. If two vectors are parallel (0° or 180°), their cross product is 0.',
    },
    layerB_Academic: {
      formalDefinition: 'The Scalar (Dot) Product of two vectors A and B is the scalar equal to the product of their magnitudes and the cosine of the included angle: A · B = |A||B| cos θ. The Vector (Cross) Product is a vector perpendicular to both vectors with magnitude |A||B| sin θ and direction governed by the right-hand rule: A × B = (|A||B| sin θ) η̂.',
      banglaFormalDefinition: 'দুটি ভেক্টরের স্কেলার বা ডট গুণন হলো ভেক্টরদ্বয়ের মান এবং তাদের মধ্যবর্তী কোণের কোসাইনের গুণফল: A · B = AB cos θ। আর ভেক্টর বা ক্রস গুণন হলো এমন একটি ভেক্টর যার মান ভেক্টরদ্বয়ের মান ও তাদের মধ্যবর্তী কোণের সাইনের গুণফলের সমান এবং দিক ডানহস্ত কর্ক-স্ক্রু নিয়মে উভয়ের উপর লম্ব: A × B = (AB sin θ) η̂।',
      physicalPrinciple: 'In Cartesian coordinates: A · B = AxBx + AyBy + AzBz. Two non-zero vectors are orthogonal if and only if A · B = 0. The cross product in determinant form is: A × B = | i  j  k ; Ax Ay Az ; Bx By Bz |. Two non-zero vectors are parallel if and only if A × B = 0 or Ax/Bx = Ay/By = Az/Bz.',
      keyEquations: [
        '\\vec{A} \\cdot \\vec{B} = A B \\cos\\theta = A_x B_x + A_y B_y + A_z B_z',
        '\\cos\\theta = \\frac{\\vec{A} \\cdot \\vec{B}}{|\\vec{A}||\\vec{B}|}',
        '\\text{Projection of } \\vec{A} \\text{ on } \\vec{B} = \\frac{\\vec{A} \\cdot \\vec{B}}{|\\vec{B}|}',
        '\\vec{A} \\times \\vec{B} = (A_y B_z - A_z B_y)\\hat{i} - (A_x B_z - A_z B_y)\\hat{j} + (A_x B_y - A_y B_x)\\hat{k}',
        '|\\vec{A} \\times \\vec{B}| = A B \\sin\\theta = \\text{Area of Parallelogram with adjacent sides } \\vec{A}, \\vec{B}',
        '\\hat{\\eta} = \\pm \\frac{\\vec{A} \\times \\vec{B}}{|\\vec{A} \\times \\vec{B}|} \\quad (\\text{Unit normal vector perpendicular to both})',
      ],
      assumptions: [
        'Coordinate system is a right-handed orthogonal Cartesian frame (i · j = 0, i × j = k)',
        'The included angle θ satisfies 0° ≤ θ ≤ 180°',
      ],
      derivation: {
        title: 'Analytical Expansion of Cross Product in Cartesian Basis',
        steps: [
          {
            stepNumber: 1,
            description: 'Apply distributive law over Cartesian unit vectors where i × i = 0, j × j = 0, k × k = 0',
            latex: '\\hat{i} \\times \\hat{j} = \\hat{k}, \\quad \\hat{j} \\times \\hat{k} = \\hat{i}, \\quad \\hat{k} \\times \\hat{i} = \\hat{j}',
            explanation: 'Unit vector cyclic rules follow the right-hand counter-clockwise convention.',
          },
          {
            stepNumber: 2,
            description: 'Expand (Ax i + Ay j + Az k) × (Bx i + By j + Bz k)',
            latex: '\\vec{A} \\times \\vec{B} = (A_y B_z - A_z B_y)\\hat{i} + (A_z B_x - A_x B_z)\\hat{j} + (A_x B_y - A_y B_x)\\hat{k}',
            explanation: 'Each unit vector component represents the projected torque or area in the coordinate plane.',
          },
          {
            stepNumber: 3,
            description: 'Express compactly as a 3 × 3 matrix determinant',
            latex: '\\vec{A} \\times \\vec{B} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ A_x & A_y & A_z \\\\ B_x & B_y & B_z \\end{vmatrix}',
            explanation: 'Standard determinant computation verified in Bangladesh NCTB board exams.',
          },
        ],
      },
    },
    layerC_ExamReady: {
      highFrequencyTrends: 'In HSC exams (2015–2026), 90% of vector CQ Ga/Gha questions test: (1) Find unknown constant m such that A and B are perpendicular (set A · B = 0), (2) Find angle θ between vectors, (3) Find unit vector perpendicular to both vectors (η̂ = ± (A × B) / |A × B|), and (4) Area of parallelogram/triangle.',
      examinerTips: [
        'When finding unit normal vector, remember the ± sign unless a specific upward/downward sense is specified.',
        'Never state cross product as a scalar! |A × B| is a scalar magnitude, but A × B is a vector.',
        'To prove two vectors are parallel, checking Ax/Bx = Ay/By = Az/Bz is much faster than computing the full cross product.',
      ],
      commonTraps: [
        'Confusing projection (scalar length = (A · B)/B) with vector component = ((A · B)/B²) B.',
        'Order matters in cross product! A × B = -(B × A). Anticommutativity is strictly penalized if reversed.',
      ],
      sampleQuestionSummary: 'Given A = 2i + 2j - k and B = 6i - 3j + 2k. Ga: Calculate the angle between A and B. Gha: Find a unit vector perpendicular to both vectors.',
    },
    workedExamples: [
      {
        id: 'we-vector-dot-angle',
        title: 'Determining the Angle between Two 3D Vectors',
        banglaTitle: 'দুটি ত্রিমাত্রিক ভেক্টরের মধ্যবর্তী কোণ নির্ণয়',
        problemStatement: 'Given two vectors A = 2i + 2j - k and B = 6i - 3j + 2k. Calculate the angle θ between them and find the projection of A along vector B.',
        banglaStatement: 'A = 2i + 2j - k এবং B = 6i - 3j + 2k ভেক্টরদ্বয়ের মধ্যবর্তী কোণ θ এবং B ভেক্টরের উপর A ভেক্টরের অভিক্ষেপ নির্ণয় করো।',
        givenData: [
          { symbol: 'A', value: '2i + 2j - k', unit: '', description: 'First vector' },
          { symbol: 'B', value: '6i - 3j + 2k', unit: '', description: 'Second vector' },
        ],
        targetVariable: { symbol: 'θ', unit: 'degrees', description: 'Angle between vectors' },
        formulaUsed: '\\vec{A} \\cdot \\vec{B} = A_x B_x + A_y B_y + A_z B_z, \\quad \\cos\\theta = \\frac{\\vec{A} \\cdot \\vec{B}}{|A||B|}',
        solutionSteps: [
          { step: 'Compute dot product: A · B = (2)(6) + (2)(-3) + (-1)(2) = 12 - 6 - 2 = 4' },
          { step: 'Compute magnitude of A: |A| = √(2² + 2² + (-1)²) = √(4 + 4 + 1) = √9 = 3' },
          { step: 'Compute magnitude of B: |B| = √(6² + (-3)² + 2²) = √(36 + 9 + 4) = √49 = 7' },
          { step: 'Compute cosine of angle: cos θ = (A · B) / (|A||B|) = 4 / (3 × 7) = 4 / 21 ≈ 0.19048' },
          { step: 'Calculate angle: θ = arccos(0.19048) = 78.96°' },
          { step: 'Projection of A on B: (A · B) / |B| = 4 / 7 ≈ 0.571' },
        ],
        finalAnswer: 'Angle θ = 78.96°; Projection of A on B = 4/7 units.',
        keyTakeaway: 'Always calculate magnitudes separately and verify that -1 ≤ cos θ ≤ 1 before taking arccos.',
        boardSource: 'Dhaka Board 2017 & Rajshahi Board 2019 Concept Standard',
      },
      {
        id: 'we-vector-cross-normal',
        title: 'Unit Vector Perpendicular to Plane and Parallelogram Area',
        banglaTitle: 'উভয় ভেক্টরের উপর লম্ব একক ভেক্টর ও সামান্তরিকের ক্ষেত্রফল',
        problemStatement: 'Two adjacent sides of a parallelogram are represented by P = 3i - j + 2k and Q = i + 2j - 4k. Determine (a) the area of the parallelogram, and (b) a unit normal vector perpendicular to the plane formed by P and Q.',
        banglaStatement: 'একটি সামান্তরিকের দুটি সন্নিহিত বাহু P = 3i - j + 2k এবং Q = i + 2j - 4k দ্বারা নির্দেশিত। (ক) সামান্তরিকটির ক্ষেত্রফল এবং (খ) P ও Q দ্বারা গঠিত তলের উপর লম্ব একক ভেক্টর নির্ণয় করো।',
        givenData: [
          { symbol: 'P', value: '3i - j + 2k', unit: '', description: 'Adjacent side vector 1' },
          { symbol: 'Q', value: 'i + 2j - 4k', unit: '', description: 'Adjacent side vector 2' },
        ],
        targetVariable: { symbol: 'Area, η̂', unit: 'sq units', description: 'Area and unit normal vector' },
        formulaUsed: '\\vec{P} \\times \\vec{Q} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ P_x & P_y & P_z \\\\ Q_x & Q_y & Q_z \\end{vmatrix}, \\quad \\text{Area} = |\\vec{P} \\times \\vec{Q}|, \\quad \\hat{\\eta} = \\pm\\frac{\\vec{P} \\times \\vec{Q}}{|\\vec{P} \\times \\vec{Q}|}',
        solutionSteps: [
          { step: 'Compute cross product P × Q determinant expansion:' },
          { step: 'i-component: (-1)(-4) - (2)(2) = 4 - 4 = 0' },
          { step: 'j-component: -[(3)(-4) - (2)(1)] = -[-12 - 2] = +14' },
          { step: 'k-component: (3)(2) - (-1)(1) = 6 + 1 = 7' },
          { step: 'Resulting cross product: P × Q = 0i + 14j + 7k = 14j + 7k' },
          { step: 'Compute magnitude: |P × Q| = √(0² + 14² + 7²) = √(196 + 49) = √245 ≈ 15.652' },
          { step: 'Area of parallelogram = |P × Q| = √245 = 7√5 ≈ 15.65 sq. units' },
          { step: 'Unit normal vector: η̂ = ± (14j + 7k) / (7√5) = ± (2j + k) / √5' },
        ],
        finalAnswer: 'Area = 7√5 ≈ 15.65 sq. units; Unit normal vector η̂ = ± (2j + k) / √5.',
        keyTakeaway: 'The magnitude of the cross product equals the area of the parallelogram formed by the two vectors. Factoring common scalars simplifies the unit vector.',
        boardSource: 'Cumilla Board 2021 & Dinajpur Board 2017',
      },
    ],
    misconceptions: [
      {
        wrongBelief: 'A · B = 0 implies either A or B must be zero.',
        scientificTruth: 'Two non-zero vectors produce a zero dot product whenever the angle between them is 90° (orthogonal).',
        whyItMatters: 'This property is the foundation for testing perpendicular vectors in HSC physics exams.',
        quickCheck: 'If (2i + 3j) · (-3i + 2j) = -6 + 6 = 0, are they perpendicular? Yes, exactly at 90°!',
      },
    ],
    quickRecap: [
      'Scalar (Dot) Product: A · B = AB cos θ = AxBx + AyBy + AzBz (Scalar). Orthogonal if A · B = 0.',
      'Vector (Cross) Product: A × B = (AB sin θ) η̂ (Vector). Parallel if A × B = 0 or Ax/Bx = Ay/By = Az/Bz.',
      'Unit normal vector to plane: η̂ = ± (A × B) / |A × B|.',
      'Area of Parallelogram with adjacent sides A, B = |A × B|. Triangle area = ½ |A × B|.',
    ],
  },

  // =========================================================================
  // TYPE 2: RIVERBOAT PROBLEMS & RELATIVE VELOCITY
  // =========================================================================
  {
    id: 'lesson-vector-riverboat',
    topicId: 'topic-vector-riverboat',
    sectionNumber: '২.৬ ও ২.৯',
    titleEn: 'Type 2: Riverboat Problems & Relative Motion',
    titleBn: 'টাইপ ২: নদী-নৌকা সমস্যা ও আপেক্ষিক বেগ',
    category: 'vector-riverboat',
    isOfficialChapter3: false,
    estimatedMinutes: 25,
    layerA_Intuitive: {
      everydayScenario: 'Imagine you want to swim straight across the Padma River from bank A to bank B directly opposite. If you swim straight across, the swift river current sweeps you far downstream! To actually land directly across without drifting downstream, you must bravely point your body UPSTREAM at an obtuse angle (greater than 90°). But if your goal is simply to get to the other side in the shortest possible time, you should steer straight across at 90°, even though you will land downstream!',
      banglaScenario: 'পদ্মা নদীতে তুমি যদি সোজাসুজি অপর পাড়ে যেতে চাও, সোজা সাঁতার কাটলে নদীর স্রোত তোমাকে ভাসিয়ে অনেক দূরে নিয়ে যাবে! ঠিক বিপরীত বিন্দুতে পৌঁছাতে চাইলে তোমাকে স্রোতের উল্টো দিকে (স্থূল কোণে) সাঁতার কাটতে হবে। কিন্তু লক্ষ্য যদি হয় "সবচেয়ে কম সময়ে" নদী পার হওয়া, তবে তোমাকে ঠিক ৯০° কোণে সোজা পাড়ের দিকে সাঁতার কাটতে হবে—যদিও স্রোত তোমাকে ভাটির দিকে নিয়ে যাবে!',
      coreIdea: 'Motion across a river depends ONLY on the velocity component perpendicular to the riverbank (vy = v sin α). The river current flows strictly parallel to the bank (vx_current = u). The current CANNOT speed up or slow down how quickly you cross the river—it only controls how far downstream you drift!',
      banglaCoreIdea: 'নদী পারাপারের সময় কেবল পাড়ের লম্ব উপাংশ (v sin α) নদী পার করায় ভূমিকা রাখে। স্রোতের বেগ (u) নদীর সমান্তরাল থাকায় নদী পারাপারের সময়ে কোনো প্রভাব ফেলে না; এটি কেবল ভাটির দিকে অপসরণ (drift) ঘটায়!',
      analogy: 'Think of walking across a moving airport travelator. Walking perpendicular to the conveyor gets you across fastest; the conveyor only drags you along its direction of travel.',
      keyObservation: 'Shortest Time crossing and Shortest Path crossing are completely different conditions requiring different angles!',
    },
    layerB_Academic: {
      formalDefinition: 'Riverboat dynamics is a two-dimensional vector addition problem where the resultant velocity R of the boat relative to the ground is the vector sum of the boat velocity relative to water v and the river flow velocity u: R = u + v.',
      banglaFormalDefinition: 'নদী-নৌকার গতি হলো দ্বিমাত্রিক ভেক্টর যোগের সমস্যা, যেখানে ভূমির সাপেক্ষে নৌকার লব্ধি বেগ R হলো স্থির পানিতে নৌকার বেগ v এবং নদীর স্রোতের বেগ u এর ভেক্টর যোগফল: R = u + v।',
      physicalPrinciple: 'Resolving along Cartesian axes where x is parallel to river flow and y is perpendicular across the river of width d: vx = u + v cos α, vy = v sin α. Time to cross: t = d / (v sin α).',
      keyEquations: [
        't = \\frac{d}{v \\sin\\alpha} \\quad (\\text{Time to cross river of width } d)',
        't_{\\min} = \\frac{d}{v} \\quad (\\text{Minimum Time when } \\alpha = 90^\\circ)',
        'x = (u + v \\cos\\alpha) t = (u + v \\cos\\alpha) \\frac{d}{v \\sin\\alpha} \\quad (\\text{Downstream Drift})',
        '\\cos\\alpha = -\\frac{u}{v} \\implies \\alpha = \\arccos\\left(-\\frac{u}{v}\\right) \\quad (\\text{Shortest Distance / Zero Drift } x = 0, \\text{ requires } v > u)',
        'R = \\sqrt{v^2 - u^2} \\quad (\\text{Resultant speed along shortest perpendicular path})',
        't_{\\text{shortest path}} = \\frac{d}{\\sqrt{v^2 - u^2}}',
      ],
      assumptions: [
        'River flow velocity u is uniform across the entire width of the river',
        'Boat maintains constant motor thrust and speed v relative to the surrounding water',
      ],
      derivation: {
        title: 'Derivation of Minimum Time vs Shortest Path Conditions',
        steps: [
          {
            stepNumber: 1,
            description: 'Write the equation for crossing time: t = d / vy',
            latex: 't = \\frac{d}{v \\sin\\alpha}',
            explanation: 'Since d and v are positive constants, t is minimized when the denominator sin α is maximized.',
          },
          {
            stepNumber: 2,
            description: 'Maximize sin α: Maximum value of sin α is 1 at α = 90°',
            latex: '\\sin\\alpha = 1 \\implies \\alpha = 90^\\circ, \\quad t_{\\min} = \\frac{d}{v}',
            explanation: 'To cross in minimum time, steer perpendicular to the river flow (α = 90°). Downstream drift is x = u(d/v).',
          },
          {
            stepNumber: 3,
            description: 'Shortest path condition (Zero downstream drift x = 0)',
            latex: 'x = (u + v \\cos\\alpha) t = 0 \\implies u + v \\cos\\alpha = 0 \\implies \\cos\\alpha = -\\frac{u}{v}',
            explanation: 'Possible only if boat speed v > u. The resultant velocity R is directed straight across at 90° to the bank: R = √(v² - u²).',
          },
        ],
      },
    },
    layerC_ExamReady: {
      highFrequencyTrends: 'In HSC exams (Dhaka, Cumilla, Chattogram, Rajshahi 2015–2026), creative questions routinely present two boatmen: Boatman A aims for minimum time (α = 90°), and Boatman B aims for directly opposite bank (cos α = -u/v). Students are asked to calculate who reaches first and the distance between their landing points.',
      examinerTips: [
        'Always state clearly: Minimum time crossing does NOT land at the opposite point; it drifts downstream by x = u × t_min.',
        'Zero drift (reaching opposite bank) is IMPOSSIBLE if current speed u exceeds boat speed v (|cos α| would be > 1).',
        'Show complete steps: state given u, v, d; find angle α; calculate resultant speed R; calculate time t.',
      ],
      commonTraps: [
        'Confusing minimum time with shortest path! Many students write α = 90° for shortest path, which is wrong.',
        'Using R = u + v or R = v - u when the motion is two-dimensional across the river.',
      ],
      sampleQuestionSummary: 'River width d = 1.5 km, river current u = 3 km/h, boat speed v = 6 km/h. Ga: Calculate the time taken to cross along the shortest path. Gha: Compare the landing positions and times if the boat is steered at 90° versus along the shortest path.',
    },
    workedExamples: [
      {
        id: 'we-riverboat-dhaka-standard',
        title: 'Comparative Analysis of Minimum Time vs Shortest Distance Crossing',
        banglaTitle: 'সর্বনিম্ন সময় বনাম ন্যূনতম দূরত্বের নদী পারাপারের তুলনামূলক বিশ্লেষণ',
        problemStatement: 'A river is 500 m wide with a current flowing at u = 3 m/s. Two identical motorboats can each travel at v = 5 m/s in still water. Boatman 1 aims to cross in the minimum possible time. Boatman 2 aims to land at the exactly opposite bank (shortest path). Determine: (a) Crossing time and drift for Boatman 1, and (b) Steering angle, crossing time, and landing position for Boatman 2.',
        banglaStatement: 'একটি নদী 500 m প্রশস্ত এবং নদীতে স্রোতের বেগ 3 m/s। দুটি মোটরচালিত নৌকা স্থির পানিতে 5 m/s বেগে চলতে পারে। ১ম মাঝি সর্বনিম্ন সময়ে এবং ২য় মাঝি সোজাসুজি অপর পাড়ে (ন্যূনতম দূরত্বে) পৌঁছাতে চায়। (ক) ১ম মাঝির পারাপারের সময় ও ভাটির অপসরণ নির্ণয় করো। (খ) ২য় মাঝির দিক, সময় ও অবতরণ বিন্দু বিশ্লেষণ করো।',
        givenData: [
          { symbol: 'd', value: '500', unit: 'm', description: 'River width' },
          { symbol: 'u', value: '3', unit: 'm/s', description: 'River current speed' },
          { symbol: 'v', value: '5', unit: 'm/s', description: 'Boat speed in still water' },
        ],
        targetVariable: { symbol: 't₁, x₁, α₂, t₂', unit: 's, m, degrees', description: 'Times and distances' },
        formulaUsed: 't_{\\min} = \\frac{d}{v}, \\quad x = u \\cdot t_{\\min}, \\quad \\cos\\alpha = -\\frac{u}{v}, \\quad R = \\sqrt{v^2 - u^2}, \\quad t = \\frac{d}{R}',
        solutionSteps: [
          { step: 'For Boatman 1 (Minimum Time): Steering angle α₁ = 90° (perpendicular to bank).' },
          { step: 'Minimum crossing time: t₁ = d / v = 500 / 5 = 100 seconds.' },
          { step: 'Downstream drift for Boatman 1: x₁ = u × t₁ = 3 × 100 = 300 m downstream from opposite point.' },
          { step: 'For Boatman 2 (Shortest Path / Zero Drift): cos α₂ = -u / v = -3 / 5 = -0.6.' },
          { step: 'Steering angle: α₂ = arccos(-0.6) = 126.87° relative to downstream river current.' },
          { step: 'Resultant speed straight across: R₂ = √(v² - u²) = √(5² - 3²) = √(25 - 9) = √16 = 4 m/s.' },
          { step: 'Crossing time for Boatman 2: t₂ = d / R₂ = 500 / 4 = 125 seconds.' },
          { step: 'Comparison: Boatman 1 crosses 25 seconds faster (100 s vs 125 s), but lands 300 m downstream. Boatman 2 takes longer but lands precisely opposite.' },
        ],
        finalAnswer: 'Boatman 1: t₁ = 100 s, drift x₁ = 300 m. Boatman 2: α₂ = 126.87°, t₂ = 125 s, drift x₂ = 0 m.',
        keyTakeaway: 'Shortest time uses full boat power purely for crossing (vy = v), whereas shortest path must divert some speed (vx = u - v cos θ = 0) to cancel the river current.',
        boardSource: 'Dhaka Board 2019 & Cumilla Board 2017 Authentic Benchmark',
      },
    ],
    misconceptions: [
      {
        wrongBelief: 'Pointing straight across the river at 90° will take you directly to the opposite bank.',
        scientificTruth: 'Pointing at 90° crosses the river fastest, but the current sweeps you downstream by distance x = u(d/v). You do NOT land directly opposite!',
        whyItMatters: 'Confusing these two concepts is the #1 reason students lose marks in HSC Chapter 2 board questions.',
        quickCheck: 'If you want zero drift, should your angle be 90° or >90°? It must be > 90° (specifically α = arccos(-u/v)).',
      },
    ],
    quickRecap: [
      'Time to cross: t = d / (v sin α).',
      'Shortest time: α = 90°, t_min = d / v. Downstream drift = u(d/v).',
      'Shortest distance (zero drift): cos α = -u/v (requires v > u). Resultant velocity R = √(v² - u²). Time t = d / √(v² - u²).',
      'General drift: x = (u + v cos α) [d / (v sin α)].',
    ],
  },

  // =========================================================================
  // TYPE 3: VECTOR CALCULUS: GRADIENT, DIVERGENCE & CURL
  // =========================================================================
  {
    id: 'lesson-vector-calculus',
    topicId: 'topic-vector-calculus',
    sectionNumber: '২.১০ ও ২.১১',
    titleEn: 'Type 3: Vector Calculus: Gradient, Divergence & Curl',
    titleBn: 'টাইপ ৩: ভেক্টর ক্যালকুলাস — গ্রেডিয়েন্ট, ডাইভারজেন্স ও কার্ল',
    category: 'vector-calculus',
    isOfficialChapter3: false,
    estimatedMinutes: 25,
    layerA_Intuitive: {
      everydayScenario: 'Imagine standing on a hilly tea garden in Sylhet. If you look around, the direction of steepest upward slope is the Gradient. Now imagine water flowing out of a garden sprinkler: water shoots outward from the nozzle in all directions, so the nozzle has positive Divergence (a source). If you unplug a kitchen sink, water swirls into the drain with whirlpool rotation: that swirling circulation is Curl!',
      banglaScenario: 'সিলেটের চা বাগানের একটি পাহাড়ে দাঁড়িয়ে আছো। যেদিকে সবচেয়ে খাড়াভাবে পাহাড়ের চূড়ার দিকে ওঠা যায়, সেই দিক ও ঢাল হলো গ্রেডিয়েন্ট। আবার বাগানের ঝরনা থেকে যখন চারদিকে পানি ছড়িয়ে পড়ে, তখন সেখানে ডাইভারজেন্স ধনাত্মক (উৎস)। আর যখন রান্নাঘরের সিঙ্কের পানি ঘূর্ণির মতো ঘুরতে ঘুরতে নিচে নামে, সেই ঘূর্ণন প্রবণতাই হলো কার্ল!',
      coreIdea: 'The vector differential operator ∇ (del / nabla) acts like a multidimensional derivative. Applying it to a scalar field gives Gradient (a vector showing steepest ascent). Applying its dot product to a vector field gives Divergence (a scalar showing outward expansion). Applying its cross product to a vector field gives Curl (a vector showing local rotation).',
      banglaCoreIdea: 'ভেক্টর ডিফারেনশিয়াল অপারেটর ∇ (ডেল বা নাবলা) ত্রিমাত্রিক অন্তরকের মতো কাজ করে। স্কেলারের সাথে প্রয়োগ করলে হয় গ্রেডিয়েন্ট (ভেক্টর রাশি), ডট গুণন করলে হয় ডাইভারজেন্স (স্কেলার রাশি), আর ক্রস গুণন করলে হয় কার্ল (ভেক্টর রাশি)।',
      analogy: 'Gradient = Compass pointing straight uphill. Divergence = Meter measuring whether a balloon is inflating (source) or deflating (sink). Curl = Tiny paddle wheel measuring if a fluid will make it spin.',
      keyObservation: 'Gradient turns a scalar into a vector. Divergence turns a vector into a scalar. Curl turns a vector into another vector.',
    },
    layerB_Academic: {
      formalDefinition: 'The Del (or Nabla) operator is the vector differential operator defined in 3D Cartesian coordinates as ∇ = i ∂/∂x + j ∂/∂y + k ∂/∂z. The Gradient of scalar field φ is ∇φ = (∂φ/∂x)i + (∂φ/∂y)j + (∂φ/∂z)k. The Divergence of vector field V is ∇ · V = ∂Vx/∂x + ∂Vy/∂y + ∂Vz/∂z. The Curl of vector field V is ∇ × V = | i j k ; ∂/∂x ∂/∂y ∂/∂z ; Vx Vy Vz |.',
      banglaFormalDefinition: 'ডেল বা নাবলা অপারেটর হলো ত্রিমাত্রিক কার্তেসীয় ব্যবস্থার ভেক্টর অন্তরক অপারেটর: ∇ = i ∂/∂x + j ∂/∂y + k ∂/∂z। স্কেলার ক্ষেত্র φ এর গ্রেডিয়েন্ট হলো ∇φ = (∂φ/∂x)i + (∂φ/∂y)j + (∂φ/∂z)k। ভেক্টর ক্ষেত্র V এর ডাইভারজেন্স হলো ∇ · V = ∂Vx/∂x + ∂Vy/∂y + ∂Vz/∂z। আর কার্ল হলো ∇ × V = | i j k ; ∂/∂x ∂/∂y ∂/∂z ; Vx Vy Vz |।',
      physicalPrinciple: 'A vector field is Solenoidal if its divergence is identically zero everywhere: ∇ · V = 0 (no sources or sinks; volume flux is conserved, like magnetic field B). A vector field is Irrotational (or Conservative) if its curl is identically zero everywhere: ∇ × V = 0 (no macroscopic or microscopic circulation; work done around any closed loop is zero).',
      keyEquations: [
        '\\nabla = \\hat{i}\\frac{\\partial}{\\partial x} + \\hat{j}\\frac{\\partial}{\\partial y} + \\hat{k}\\frac{\\partial}{\\partial z} \\quad (\\text{Del Operator})',
        '\\text{grad } \\phi = \\nabla\\phi = \\frac{\\partial\\phi}{\\partial x}\\hat{i} + \\frac{\\partial\\phi}{\\partial y}\\hat{j} + \\frac{\\partial\\phi}{\\partial z}\\hat{k} \\quad (\\text{Vector})',
        '\\text{div } \\vec{V} = \\nabla \\cdot \\vec{V} = \\frac{\\partial V_x}{\\partial x} + \\frac{\\partial V_y}{\\partial y} + \\frac{\\partial V_z}{\\partial z} \\quad (\\text{Scalar})',
        '\\nabla \\cdot \\vec{V} = 0 \\iff \\vec{V} \\text{ is Solenoidal (সলিনয়ডাল)}',
        '\\text{curl } \\vec{V} = \\nabla \\times \\vec{V} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ \\frac{\\partial}{\\partial x} & \\frac{\\partial}{\\partial y} & \\frac{\\partial}{\\partial z} \\\\ V_x & V_y & V_z \\end{vmatrix} \\quad (\\text{Vector})',
        '\\nabla \\times \\vec{V} = \\vec{0} \\iff \\vec{V} \\text{ is Irrotational / Conservative (অঘূর্ণনশীল)}',
      ],
      assumptions: [
        'All scalar and vector fields are continuously differentiable (C¹ fields) in the domain',
        'Standard partial differentiation holds: when differentiating w.r.t x, variables y and z are treated as constants',
      ],
      derivation: {
        title: 'Evaluation of Divergence and Solenoidal Condition',
        steps: [
          {
            stepNumber: 1,
            description: 'Apply definition of del operator to vector field V = Vx i + Vy j + Vz k',
            latex: '\\nabla \\cdot \\vec{V} = \\left(\\hat{i}\\frac{\\partial}{\\partial x} + \\hat{j}\\frac{\\partial}{\\partial y} + \\hat{k}\\frac{\\partial}{\\partial z}\\right) \\cdot (V_x\\hat{i} + V_y\\hat{j} + V_z\\hat{k})',
            explanation: 'Unit vector dot products yield i·i = 1, j·j = 1, k·k = 1, and cross terms vanish.',
          },
          {
            stepNumber: 2,
            description: 'Sum the three partial derivatives',
            latex: '\\nabla \\cdot \\vec{V} = \\frac{\\partial V_x}{\\partial x} + \\frac{\\partial V_y}{\\partial y} + \\frac{\\partial V_z}{\\partial z}',
            explanation: 'The result is a scalar quantity representing net flux per unit volume.',
          },
          {
            stepNumber: 3,
            description: 'Apply solenoidal condition',
            latex: '\\nabla \\cdot \\vec{V} = 0 \\implies \\text{Incompressible field (no net generation/loss of fluid)}',
            explanation: 'Crucial for solving for unknown constants in HSC board questions.',
          },
        ],
      },
    },
    layerC_ExamReady: {
      highFrequencyTrends: 'In HSC exams (2015–2026), vector calculus questions test: (1) Find constant a such that field V is solenoidal (∇ · V = 0), (2) Prove that a field is irrotational (∇ × V = 0), (3) Evaluate ∇φ at point (x, y, z). These are guaranteed 3-mark (Ga) and 4-mark (Gha) questions in Board exams.',
      examinerTips: [
        'Always remember: ∇φ is a VECTOR, ∇ · V is a SCALAR, and ∇ × V is a VECTOR.',
        'When testing for irrotational, state curl V = 0i + 0j + 0k = 0 (the zero vector, not just scalar 0).',
        'During partial differentiation with respect to x, treat y and z strictly as numerical constants (d/dx(x² y z) = 2x y z).',
      ],
      commonTraps: [
        'Confusing solenoidal with irrotational: Solenoidal = Divergence is 0. Irrotational = Curl is 0.',
        'Differentiating the wrong variable: e.g. writing ∂/∂x(x² y) = 2x + y instead of 2xy.',
      ],
      sampleQuestionSummary: 'Given vector field V = (x + 3y)i + (y - 2z)j + (x + az)k. Ga: Find the value of constant a for which V is solenoidal. Gha: Check whether field F = (y² - z²)i + (2xy)j - (2xz)k is irrotational.',
    },
    workedExamples: [
      {
        id: 'we-vector-calc-solenoidal',
        title: 'Finding Unknown Constant for a Solenoidal Vector Field',
        banglaTitle: 'সলিনয়ডাল ভেক্টর ক্ষেত্রের জন্য অজানা ধ্রুবক a এর মান নির্ণয়',
        problemStatement: 'A vector field is defined as V = (x + 3y)i + (y - 2z)j + (x + az)k. Determine the numerical value of the constant a such that the vector field is solenoidal.',
        banglaStatement: 'একটি ভেক্টর ক্ষেত্র V = (x + 3y)i + (y - 2z)j + (x + az)k দ্বারা সংজ্ঞায়িত। a এর মান কত হলে ভেক্টর ক্ষেত্রটি সলিনয়ডাল (Solenoidal) হবে তা নির্ণয় করো।',
        givenData: [
          { symbol: 'Vx', value: 'x + 3y', unit: '', description: 'x-component of field' },
          { symbol: 'Vy', value: 'y - 2z', unit: '', description: 'y-component of field' },
          { symbol: 'Vz', value: 'x + az', unit: '', description: 'z-component of field' },
        ],
        targetVariable: { symbol: 'a', unit: 'dimensionless', description: 'Constant for solenoidal condition' },
        formulaUsed: '\\nabla \\cdot \\vec{V} = \\frac{\\partial V_x}{\\partial x} + \\frac{\\partial V_y}{\\partial y} + \\frac{\\partial V_z}{\\partial z} = 0',
        solutionSteps: [
          { step: 'Recall solenoidal condition: Divergence must equal zero everywhere, ∇ · V = 0.' },
          { step: 'Differentiate Vx with respect to x: ∂/∂x (x + 3y) = 1 + 0 = 1' },
          { step: 'Differentiate Vy with respect to y: ∂/∂y (y - 2z) = 1 - 0 = 1' },
          { step: 'Differentiate Vz with respect to z: ∂/∂z (x + az) = 0 + a = a' },
          { step: 'Sum the three partial derivatives: ∇ · V = 1 + 1 + a = 2 + a' },
          { step: 'Set divergence to zero: 2 + a = 0  ==>  a = -2' },
        ],
        finalAnswer: 'The vector field is solenoidal when a = -2.',
        keyTakeaway: 'The solenoidal condition ∇ · V = 0 reflects physical volume conservation (incompressible flow) with no sources or sinks.',
        boardSource: 'Rajshahi Board 2017 & Cumilla Board 2019 Authentic Question',
      },
      {
        id: 'we-vector-calc-irrotational',
        title: 'Verifying Irrotational Field and Conservative Nature',
        banglaTitle: 'ভেক্টর ক্ষেত্র অঘূর্ণনশীল বা সংরক্ষণশীল কিনা যাচাই',
        problemStatement: 'Given the vector field F = (y² - z² + 3yz)i + (2xy + 3xz)j + (3xy - 2xz)k. Verify whether this field is irrotational (curl F = 0).',
        banglaStatement: 'একটি ভেক্টর ক্ষেত্র F = (y² - z² + 3yz)i + (2xy + 3xz)j + (3xy - 2xz)k দেওয়া হলো। উদ্দীপকের ক্ষেত্রটি অঘূর্ণনশীল কিনা গাণিতিকভাবে যাচাই করো।',
        givenData: [
          { symbol: 'F', value: '(y² - z² + 3yz)i + (2xy + 3xz)j + (3xy - 2xz)k', unit: '', description: 'Vector field' },
        ],
        targetVariable: { symbol: '∇ × F', unit: '', description: 'Curl of vector field' },
        formulaUsed: '\\nabla \\times \\vec{F} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ \\frac{\\partial}{\\partial x} & \\frac{\\partial}{\\partial y} & \\frac{\\partial}{\\partial z} \\\\ F_x & F_y & F_z \\end{vmatrix}',
        solutionSteps: [
          { step: 'Set up curl determinant components: curl F = [∂Fz/∂y - ∂Fy/∂z] i - [∂Fz/∂x - ∂Fx/∂z] j + [∂Fy/∂x - ∂Fx/∂y] k' },
          { step: 'i-component: ∂/∂y (3xy - 2xz) - ∂/∂z (2xy + 3xz) = 3x - 3x = 0' },
          { step: 'j-component: -[∂/∂x (3xy - 2xz) - ∂/∂z (y² - z² + 3yz)] = -[(3y - 2z) - (-2z + 3y)] = -[(3y - 2z) - (3y - 2z)] = 0' },
          { step: 'k-component: ∂/∂x (2xy + 3xz) - ∂/∂y (y² - z² + 3yz) = (2y + 3z) - (2y + 3z) = 0' },
          { step: 'Combine components: ∇ × F = 0i + 0j + 0k = 0' },
          { step: 'Conclusion: Since curl F = 0, the field is irrotational and represents a conservative vector field.' },
        ],
        finalAnswer: 'curl F = 0; the field is verified to be irrotational (conservative).',
        keyTakeaway: 'When every component of the curl determinant evaluates to zero, fluid particles undergo translation and strain without macroscopic rotation.',
        boardSource: 'Dhaka Board 2021 & Chattogram Board 2017 Authentic Question',
      },
    ],
    misconceptions: [
      {
        wrongBelief: 'Divergence produces a vector, and curl produces a scalar.',
        scientificTruth: 'Divergence (∇ · V) is a dot product producing a SCALAR. Curl (∇ × V) is a cross product producing a VECTOR. Gradient (∇φ) produces a VECTOR.',
        whyItMatters: 'Writing a vector unit (i, j, k) on a divergence answer or omitting vector signs on curl loses full marks.',
        quickCheck: 'Is ∇ · V a scalar or vector? It is a SCALAR scalar flux rate.',
      },
    ],
    quickRecap: [
      'Del Operator: ∇ = i ∂/∂x + j ∂/∂y + k ∂/∂z.',
      'Gradient: ∇φ = (∂φ/∂x)i + (∂φ/∂y)j + (∂φ/∂z)k (Vector). Shows direction of steepest increase.',
      'Divergence: ∇ · V = ∂Vx/∂x + ∂Vy/∂y + ∂Vz/∂z (Scalar). Net outward flux.',
      'Solenoidal field condition: ∇ · V = 0.',
      'Curl: ∇ × V = | i j k ; ∂/∂x ∂/∂y ∂/∂z ; Vx Vy Vz | (Vector). Microscopic circulation.',
      'Irrotational (conservative) field condition: ∇ × V = 0.',
    ],
  },
];
