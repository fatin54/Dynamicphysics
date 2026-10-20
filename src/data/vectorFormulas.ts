import { FormulaItem } from '@/types';

export const VECTOR_FORMULAS: FormulaItem[] = [
  {
    id: 'formula-dot-product',
    name: 'Scalar (Dot) Product & Angle',
    banglaName: 'স্কেলার (ডট) গুণন ও মধ্যবর্তী কোণ',
    category: 'vector_algebra',
    latex: '\\vec{A} \\cdot \\vec{B} = A_x B_x + A_y B_y + A_z B_z = |A||B| \\cos\\theta',
    textbookNotation: 'A · B = AB cos θ',
    textbookSection: '২.৭',
    isOfficialChapter3: false,
    variables: [
      { symbol: 'Ax', name: 'Vector A x-component', banglaName: 'A ভেক্টরের x উপাংশ', unit: '', description: 'Component along i' },
      { symbol: 'Ay', name: 'Vector A y-component', banglaName: 'A ভেক্টরের y উপাংশ', unit: '', description: 'Component along j' },
      { symbol: 'Az', name: 'Vector A z-component', banglaName: 'A ভেক্টরের z উপাংশ', unit: '', description: 'Component along k' },
      { symbol: 'Bx', name: 'Vector B x-component', banglaName: 'B ভেক্টরের x উপাংশ', unit: '', description: 'Component along i' },
      { symbol: 'By', name: 'Vector B y-component', banglaName: 'B ভেক্টরের y উপাংশ', unit: '', description: 'Component along j' },
      { symbol: 'Bz', name: 'Vector B z-component', banglaName: 'B ভেক্টরের z উপাংশ', unit: '', description: 'Component along k' },
    ],
    conditions: [
      'Two 3D vectors defined in orthogonal Cartesian coordinates',
      'Orthogonal condition: A · B = 0 if and only if vectors are perpendicular (θ = 90°)',
    ],
    plainEnglishExplanation: 'The dot product measures the projection of one vector along another multiplied by the other magnitude. It yields a scalar value.',
    banglaExplanation: 'দুটি ভেক্টরের ডট গুণন একটি স্কেলার রাশি। এদের মান শূন্য হলে ভেক্টরদ্বয় পরস্পর লম্ব হয়।',
    commonMistakes: [
      'Adding unit vectors i, j, k to the result of a dot product (dot product produces a scalar, not a vector).',
      'Forgetting to take absolute magnitudes when computing cos θ.',
    ],
    workedExample: {
      id: 'we-formula-dot',
      title: 'Calculating Dot Product and Angle',
      problemStatement: 'Compute the dot product and angle between A = 2i + 3j - k and B = i - 2j + 4k.',
      givenData: [
        { symbol: 'A', value: '2i + 3j - k', unit: '', description: 'Vector A' },
        { symbol: 'B', value: 'i - 2j + 4k', unit: '', description: 'Vector B' },
      ],
      targetVariable: { symbol: 'θ', unit: 'deg', description: 'Angle between vectors' },
      formulaUsed: 'A · B = AxBx + AyBy + AzBz',
      solutionSteps: [
        { step: 'A · B = (2)(1) + (3)(-2) + (-1)(4) = 2 - 6 - 4 = -8' },
        { step: '|A| = √(2² + 3² + (-1)²) = √(4 + 9 + 1) = √14 ≈ 3.742' },
        { step: '|B| = √(1² + (-2)² + 4²) = √(1 + 4 + 16) = √21 ≈ 4.583' },
        { step: 'cos θ = -8 / (√14 × √21) = -8 / 17.146 = -0.4666' },
        { step: 'θ = arccos(-0.4666) ≈ 117.82° (obtuse angle)' },
      ],
      finalAnswer: 'A · B = -8, θ = 117.82°',
      keyTakeaway: 'A negative dot product indicates an obtuse angle between 90° and 180°.',
    },
    calculatorConfig: {
      variables: [
        { symbol: 'Ax', label: 'Vector A (x)', unit: '', defaultValue: 2, min: -100, max: 100, step: 0.5 },
        { symbol: 'Ay', label: 'Vector A (y)', unit: '', defaultValue: 3, min: -100, max: 100, step: 0.5 },
        { symbol: 'Az', label: 'Vector A (z)', unit: '', defaultValue: -1, min: -100, max: 100, step: 0.5 },
        { symbol: 'Bx', label: 'Vector B (x)', unit: '', defaultValue: 1, min: -100, max: 100, step: 0.5 },
        { symbol: 'By', label: 'Vector B (y)', unit: '', defaultValue: -2, min: -100, max: 100, step: 0.5 },
        { symbol: 'Bz', label: 'Vector B (z)', unit: '', defaultValue: 4, min: -100, max: 100, step: 0.5 },
      ],
      solvableVariables: ['dotProduct', 'angleDeg', 'magA', 'magB'],
      solve: (target: string, values: Record<string, number>) => {
        const { Ax = 0, Ay = 0, Az = 0, Bx = 0, By = 0, Bz = 0 } = values;
        const dot = Ax * Bx + Ay * By + Az * Bz;
        const magA = Math.sqrt(Ax * Ax + Ay * Ay + Az * Az);
        const magB = Math.sqrt(Bx * Bx + By * By + Bz * Bz);
        const cosTheta = magA > 0 && magB > 0 ? Math.max(-1, Math.min(1, dot / (magA * magB))) : 0;
        const angleDeg = (Math.acos(cosTheta) * 180) / Math.PI;

        if (target === 'angleDeg') {
          return {
            result: Number(angleDeg.toFixed(2)),
            unit: 'degrees',
            steps: [
              `Step 1: A · B = (${Ax})(${Bx}) + (${Ay})(${By}) + (${Az})(${Bz}) = ${dot.toFixed(2)}`,
              `Step 2: |A| = √(${Ax}² + ${Ay}² + ${Az}²) = ${magA.toFixed(3)}`,
              `Step 3: |B| = √(${Bx}² + ${By}² + ${Bz}²) = ${magB.toFixed(3)}`,
              `Step 4: cos θ = ${dot.toFixed(2)} / (${magA.toFixed(3)} × ${magB.toFixed(3)}) = ${cosTheta.toFixed(4)}`,
              `Step 5: θ = arccos(${cosTheta.toFixed(4)}) = ${angleDeg.toFixed(2)}°`,
            ],
          };
        }

        return {
          result: Number(dot.toFixed(2)),
          unit: 'scalar units',
          steps: [
            `A · B = (${Ax})(${Bx}) + (${Ay})(${By}) + (${Az})(${Bz}) = ${dot.toFixed(2)}`,
            `Magnitude |A| = ${magA.toFixed(3)}, |B| = ${magB.toFixed(3)}`,
            `Included angle θ = ${angleDeg.toFixed(2)}°`,
          ],
        };
      },
    },
  },

  {
    id: 'formula-cross-product',
    name: 'Vector (Cross) Product & Area',
    banglaName: 'ভেক্টর (ক্রস) গুণন ও ক্ষেত্রফল',
    category: 'vector_algebra',
    latex: '\\vec{A} \\times \\vec{B} = (A_y B_z - A_z B_y)\\hat{i} - (A_x B_z - A_z B_x)\\hat{j} + (A_x B_y - A_y B_x)\\hat{k}',
    textbookNotation: 'A × B = (AB sin θ) η̂',
    textbookSection: '২.৮',
    isOfficialChapter3: false,
    variables: [
      { symbol: 'Ax', name: 'Vector A (x)', banglaName: 'A ভেক্টরের x', unit: '', description: 'Component along i' },
      { symbol: 'Ay', name: 'Vector A (y)', banglaName: 'A ভেক্টরের y', unit: '', description: 'Component along j' },
      { symbol: 'Az', name: 'Vector A (z)', banglaName: 'A ভেক্টরের z', unit: '', description: 'Component along k' },
      { symbol: 'Bx', name: 'Vector B (x)', banglaName: 'B ভেক্টরের x', unit: '', description: 'Component along i' },
      { symbol: 'By', name: 'Vector B (y)', banglaName: 'B ভেক্টরের y', unit: '', description: 'Component along j' },
      { symbol: 'Bz', name: 'Vector B (z)', banglaName: 'B ভেক্টরের z', unit: '', description: 'Component along k' },
    ],
    conditions: [
      'Two 3D vectors defined in orthogonal Cartesian coordinates',
      'Parallel condition: A × B = 0 if and only if vectors are collinear (θ = 0° or 180°)',
    ],
    plainEnglishExplanation: 'The cross product produces a new vector perpendicular to both input vectors, with magnitude equal to the area of the parallelogram spanned by them.',
    banglaExplanation: 'ক্রস গুণন একটি নতুন ভেক্টর রাশি তৈরি করে যা মূল ভেক্টরদ্বয়ের তলের সাথে লম্ব এবং এর মান সামান্তরিকের ক্ষেত্রফলের সমান।',
    commonMistakes: [
      'Swapping vector order without changing signs: A × B = -(B × A).',
      'Forgetting the negative sign on the j-component determinant expansion.',
    ],
    workedExample: {
      id: 'we-formula-cross',
      title: 'Computing Cross Product & Area',
      problemStatement: 'Calculate A × B and the area of the parallelogram formed by A = 2i - j + 3k and B = i + 2j - 2k.',
      givenData: [
        { symbol: 'A', value: '2i - j + 3k', unit: '', description: 'Vector A' },
        { symbol: 'B', value: 'i + 2j - 2k', unit: '', description: 'Vector B' },
      ],
      targetVariable: { symbol: 'Area', unit: 'sq. units', description: 'Parallelogram area' },
      formulaUsed: 'A × B = | i j k ; Ax Ay Az ; Bx By Bz |',
      solutionSteps: [
        { step: 'i: (-1)(-2) - (3)(2) = 2 - 6 = -4' },
        { step: 'j: -[(2)(-2) - (3)(1)] = -[-4 - 3] = +7' },
        { step: 'k: (2)(2) - (-1)(1) = 4 + 1 = 5' },
        { step: 'A × B = -4i + 7j + 5k' },
        { step: 'Magnitude: |A × B| = √((-4)² + 7² + 5²) = √(16 + 49 + 25) = √90 ≈ 9.487 sq. units' },
      ],
      finalAnswer: 'A × B = -4i + 7j + 5k, Area = 9.487 sq. units',
      keyTakeaway: 'The magnitude of cross product represents geometric area of the parallelogram.',
    },
    calculatorConfig: {
      variables: [
        { symbol: 'Ax', label: 'Vector A (x)', unit: '', defaultValue: 2, min: -100, max: 100, step: 0.5 },
        { symbol: 'Ay', label: 'Vector A (y)', unit: '', defaultValue: -1, min: -100, max: 100, step: 0.5 },
        { symbol: 'Az', label: 'Vector A (z)', unit: '', defaultValue: 3, min: -100, max: 100, step: 0.5 },
        { symbol: 'Bx', label: 'Vector B (x)', unit: '', defaultValue: 1, min: -100, max: 100, step: 0.5 },
        { symbol: 'By', label: 'Vector B (y)', unit: '', defaultValue: 2, min: -100, max: 100, step: 0.5 },
        { symbol: 'Bz', label: 'Vector B (z)', unit: '', defaultValue: -2, min: -100, max: 100, step: 0.5 },
      ],
      solvableVariables: ['area', 'cx', 'cy', 'cz'],
      solve: (target: string, values: Record<string, number>) => {
        const { Ax = 0, Ay = 0, Az = 0, Bx = 0, By = 0, Bz = 0 } = values;
        const cx = Ay * Bz - Az * By;
        const cy = -(Ax * Bz - Az * Bx);
        const cz = Ax * By - Ay * Bx;
        const area = Math.sqrt(cx * cx + cy * cy + cz * cz);

        return {
          result: Number(area.toFixed(3)),
          unit: 'sq. units',
          steps: [
            `i-comp = (${Ay})(${Bz}) - (${Az})(${By}) = ${cx.toFixed(2)}`,
            `j-comp = -[(${Ax})(${Bz}) - (${Az})(${Bx})] = ${cy.toFixed(2)}`,
            `k-comp = (${Ax})(${By}) - (${Ay})(${Bx}) = ${cz.toFixed(2)}`,
            `Cross product: A × B = (${cx.toFixed(2)})i + (${cy.toFixed(2)})j + (${cz.toFixed(2)})k`,
            `Area = |A × B| = √(${cx.toFixed(2)}² + ${cy.toFixed(2)}² + ${cz.toFixed(2)}²) = ${area.toFixed(3)} sq. units`,
          ],
        };
      },
    },
  },

  {
    id: 'formula-riverboat-crossing',
    name: 'River Crossing Time, Drift & Shortest Path',
    banglaName: 'নদী পারাপারের সময়, ভাটির অপসরণ ও ন্যূনতম দূরত্ব',
    category: 'riverboat_relative',
    latex: 't = \\frac{d}{v \\sin\\alpha}, \\quad x = (u + v \\cos\\alpha) t, \\quad t_{\\min} = \\frac{d}{v} \\; (\\alpha=90^\\circ), \\quad \\cos\\alpha = -\\frac{u}{v} \\; (x=0)',
    textbookNotation: 't = d / (v sin α)',
    textbookSection: '২.৯',
    isOfficialChapter3: false,
    variables: [
      { symbol: 'd', name: 'River Width', banglaName: 'নদীর প্রস্থ', unit: 'm', description: 'Perpendicular width across river' },
      { symbol: 'u', name: 'River Current Speed', banglaName: 'স্রোতের বেগ', unit: 'm/s', description: 'Flow velocity along bank' },
      { symbol: 'v', name: 'Boat Speed in Still Water', banglaName: 'নৌকার নিজস্ব বেগ', unit: 'm/s', description: 'Motor/rowing speed in still water' },
      { symbol: 'alpha', name: 'Steering Angle', banglaName: 'নৌকা চালানোর কোণ', unit: 'deg', description: 'Angle measured relative to downstream river current' },
    ],
    conditions: [
      'Uniform stream velocity u across river width d',
      'Shortest path crossing (zero drift) requires v > u',
      'Minimum time occurs strictly at α = 90°',
    ],
    plainEnglishExplanation: 'Crossing time depends purely on the velocity component perpendicular to banks (v sin α). River flow only influences downstream drift along the banks.',
    banglaExplanation: 'নদী পারাপারের সময় নির্ভর করে কেবলমাত্র উলম্ব উপাংশ v sin α এর উপর। স্রোতের বেগ শুধুমাত্র ভাটির দিকে অপসরণ (drift) ঘটায়।',
    commonMistakes: [
      'Assuming minimum time crosses directly to opposite bank (it actually drifts by u × d / v).',
      'Trying to achieve zero drift when current u is faster than boat speed v (impossible since cos α = -u/v would exceed 1).',
    ],
    workedExample: {
      id: 'we-formula-river',
      title: 'Padma Riverboat Crossing Calculations',
      problemStatement: 'A river of width 600 m has a flow speed of 2.5 m/s. A motorboat moves at 5 m/s in still water. Find the minimum crossing time and the steering angle required for zero drift.',
      givenData: [
        { symbol: 'd', value: '600', unit: 'm', description: 'River width' },
        { symbol: 'u', value: '2.5', unit: 'm/s', description: 'River current' },
        { symbol: 'v', value: '5', unit: 'm/s', description: 'Boat speed' },
      ],
      targetVariable: { symbol: 't_min, α_zeroDrift', unit: 's, deg', description: 'Time and angle' },
      formulaUsed: 't_min = d / v, cos α = -u / v',
      solutionSteps: [
        { step: 'Minimum time (α = 90°): t_min = 600 / 5 = 120 s' },
        { step: 'Downstream drift at t_min: x = u × t_min = 2.5 × 120 = 300 m' },
        { step: 'For zero drift: cos α = -u / v = -2.5 / 5 = -0.5' },
        { step: 'Steering angle: α = arccos(-0.5) = 120°' },
        { step: 'Resultant speed: R = √(5² - 2.5²) = √(25 - 6.25) = √18.75 ≈ 4.33 m/s' },
        { step: 'Shortest path time: t = 600 / 4.33 = 138.56 s' },
      ],
      finalAnswer: 't_min = 120 s (drift 300 m); Zero drift angle α = 120° (time = 138.56 s)',
      keyTakeaway: 'Steering upstream at 120° successfully avoids drift at the cost of 18.56 s extra crossing time.',
    },
    calculatorConfig: {
      variables: [
        { symbol: 'd', label: 'River Width (d)', unit: 'm', defaultValue: 500, min: 10, max: 10000, step: 10 },
        { symbol: 'u', label: 'Current Speed (u)', unit: 'm/s', defaultValue: 3, min: 0, max: 50, step: 0.1 },
        { symbol: 'v', label: 'Boat Speed (v)', unit: 'm/s', defaultValue: 5, min: 0.1, max: 50, step: 0.1 },
        { symbol: 'alpha', label: 'Steering Angle (α)', unit: 'deg', defaultValue: 90, min: 1, max: 179, step: 1 },
      ],
      solvableVariables: ['time', 'drift', 'resultantSpeed'],
      solve: (target: string, values: Record<string, number>) => {
        const { d = 500, u = 3, v = 5, alpha = 90 } = values;
        const alphaRad = (alpha * Math.PI) / 180;
        const vy = v * Math.sin(alphaRad);
        const vx = u + v * Math.cos(alphaRad);
        const t = vy > 0 ? d / vy : 999999;
        const drift = vx * t;
        const R = Math.sqrt(vx * vx + vy * vy);

        const tMin = d / v;
        const driftMin = u * tMin;

        let zeroDriftAngle = 'N/A (v <= u)';
        let zeroDriftTime = 'N/A';
        if (v > u) {
          const cosVal = -u / v;
          const zdAngle = (Math.acos(cosVal) * 180) / Math.PI;
          const R_zd = Math.sqrt(v * v - u * u);
          const t_zd = d / R_zd;
          zeroDriftAngle = `${zdAngle.toFixed(2)}°`;
          zeroDriftTime = `${t_zd.toFixed(2)} s`;
        }

        if (target === 'drift') {
          return {
            result: Number(drift.toFixed(2)),
            unit: 'm (downstream)',
            steps: [
              `Vertical crossing velocity vy = v sin(${alpha}°) = ${v} × ${Math.sin(alphaRad).toFixed(3)} = ${vy.toFixed(3)} m/s`,
              `Crossing time t = d / vy = ${d} / ${vy.toFixed(3)} = ${t.toFixed(2)} s`,
              `Horizontal net velocity vx = u + v cos(${alpha}°) = ${u} + (${(v * Math.cos(alphaRad)).toFixed(3)}) = ${vx.toFixed(3)} m/s`,
              `Drift x = vx × t = ${vx.toFixed(3)} × ${t.toFixed(2)} = ${drift.toFixed(2)} m`,
            ],
          };
        }

        return {
          result: Number(t.toFixed(2)),
          unit: 'seconds',
          steps: [
            `Crossing time t = ${d} / (${v} × sin(${alpha}°)) = ${t.toFixed(2)} s`,
            `Downstream drift at this angle: ${drift.toFixed(2)} m`,
            `Resultant ground velocity R: ${R.toFixed(3)} m/s`,
            `--- Benchmark comparisons ---`,
            `Minimum Time condition (α = 90°): t_min = ${tMin.toFixed(2)} s (drift: ${driftMin.toFixed(2)} m)`,
            `Zero Drift condition (reach opposite bank): α = ${zeroDriftAngle}, time = ${zeroDriftTime}`,
          ],
        };
      },
    },
  },

  {
    id: 'formula-vector-calculus',
    name: 'Vector Calculus: Divergence & Solenoidal Condition',
    banglaName: 'ভেক্টর ক্যালকুলাস: ডাইভারজেন্স ও সলিনয়ডাল শর্ত',
    category: 'vector_calculus',
    latex: '\\nabla \\cdot \\vec{V} = \\frac{\\partial V_x}{\\partial x} + \\frac{\\partial V_y}{\\partial y} + \\frac{\\partial V_z}{\\partial z} = 0 \\quad (\\text{Solenoidal})',
    textbookNotation: 'div V = 0',
    textbookSection: '২.১০',
    isOfficialChapter3: false,
    variables: [
      { symbol: 'c1', name: 'Coefficient of x in Vx', banglaName: 'Vx এ x এর সহগ', unit: '', description: 'Linear slope ∂Vx/∂x' },
      { symbol: 'c2', name: 'Coefficient of y in Vy', banglaName: 'Vy এ y এর সহগ', unit: '', description: 'Linear slope ∂Vy/∂y' },
    ],
    conditions: [
      'Continuously differentiable 3D vector field',
      'Solenoidal condition: net flux through closed boundary is zero (∇ · V = 0)',
    ],
    plainEnglishExplanation: 'Divergence measures whether a vector field acts as a source (>0), sink (<0), or incompressible solenoidal flow (=0).',
    banglaExplanation: 'ভেক্টর ক্ষেত্রের ডাইভারজেন্স শূন্য হলে তাকে সলিনয়ডাল ক্ষেত্র বলে, যা নির্দেশ করে কোনো বিন্দুতে তরল বা ফ্লাক্স সৃষ্টি বা ধ্বংস হচ্ছে না।',
    commonMistakes: [
      'Confusing solenoidal (div = 0) with irrotational (curl = 0).',
      'Forgetting that divergence yields a scalar number, not a vector with i, j, k.',
    ],
    workedExample: {
      id: 'we-formula-calc',
      title: 'Determining Unknown Constant for Solenoidal Field',
      problemStatement: 'Find constant a such that V = (2x + 4y)i + (3y - z)j + (5x + az)k is solenoidal.',
      givenData: [
        { symbol: 'V', value: '(2x + 4y)i + (3y - z)j + (5x + az)k', unit: '', description: 'Vector field' },
      ],
      targetVariable: { symbol: 'a', unit: '', description: 'Unknown constant' },
      formulaUsed: '∇ · V = ∂Vx/∂x + ∂Vy/∂y + ∂Vz/∂z = 0',
      solutionSteps: [
        { step: '∂Vx/∂x = ∂/∂x(2x + 4y) = 2' },
        { step: '∂Vy/∂y = ∂/∂y(3y - z) = 3' },
        { step: '∂Vz/∂z = ∂/∂z(5x + az) = a' },
        { step: '∇ · V = 2 + 3 + a = 5 + a = 0' },
        { step: 'a = -5' },
      ],
      finalAnswer: 'a = -5',
      keyTakeaway: 'For linear fields, divergence is the direct sum of the diagonal partial derivative slopes.',
    },
    calculatorConfig: {
      variables: [
        { symbol: 'c1', label: 'Slope ∂Vx/∂x (e.g. in (c1·x)i)', unit: '', defaultValue: 1, min: -20, max: 20, step: 1 },
        { symbol: 'c2', label: 'Slope ∂Vy/∂y (e.g. in (c2·y)j)', unit: '', defaultValue: 1, min: -20, max: 20, step: 1 },
      ],
      solvableVariables: ['solenoidalConstantA'],
      solve: (target: string, values: Record<string, number>) => {
        const { c1 = 1, c2 = 1 } = values;
        // Solenoidal condition: c1 + c2 + a = 0 => a = -(c1 + c2)
        const a = -(c1 + c2);
        return {
          result: a,
          unit: 'scalar constant',
          steps: [
            `∂Vx/∂x = ${c1}`,
            `∂Vy/∂y = ${c2}`,
            `∂Vz/∂z = a`,
            `Divergence: ∇ · V = ${c1} + ${c2} + a`,
            `Setting ∇ · V = 0 for solenoidal condition:`,
            `${c1 + c2} + a = 0  ==>  a = ${a}`,
          ],
        };
      },
    },
  },
];
