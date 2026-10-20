/**
 * Canonical Bangladesh HSC Creative Question (CQ) Subpart Normalization & Utilities
 * 
 * Standard NCTB Structure:
 * - ক (Ka)  : জ্ঞানমূলক (Knowledge)       - 1 Mark
 * - খ (Kha) : অনুধাবনমূলক (Comprehension) - 2 Marks
 * - গ (Ga)  : প্রয়োগমূলক (Application)     - 3 Marks
 * - ঘ (Gha) : উচ্চতর দক্ষতা (Higher Ability)- 4 Marks
 */

export const CQ_SUBPARTS = {
  ka: {
    id: 'ka',
    labelBn: 'ক',
    labelEn: 'Ka',
    titleBn: 'জ্ঞানমূলক (Knowledge)',
    titleEn: 'Knowledge',
    standardMarks: 1,
    badgeBg: 'bg-sky-50 dark:bg-sky-950/40',
    badgeText: 'text-sky-700 dark:text-sky-300',
    badgeBorder: 'border-sky-200 dark:border-sky-800',
  },
  kha: {
    id: 'kha',
    labelBn: 'খ',
    labelEn: 'Kha',
    titleBn: 'অনুধাবনমূলক (Comprehension)',
    titleEn: 'Comprehension',
    standardMarks: 2,
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
  },
  ga: {
    id: 'ga',
    labelBn: 'গ',
    labelEn: 'Ga',
    titleBn: 'প্রয়োগমূলক (Application)',
    titleEn: 'Application',
    standardMarks: 3,
    badgeBg: 'bg-orange-pale',
    badgeText: 'text-orange-deep',
    badgeBorder: 'border-orange-light',
  },
  gha: {
    id: 'gha',
    labelBn: 'ঘ',
    labelEn: 'Gha',
    titleBn: 'উচ্চতর দক্ষতা (Higher Ability)',
    titleEn: 'Higher Ability',
    standardMarks: 4,
    badgeBg: 'bg-maroon-pale',
    badgeText: 'text-maroon-deep',
    badgeBorder: 'border-maroon-light',
  },
};

export const CQ_SUBPART_ORDER = ['ka', 'kha', 'ga', 'gha'];

/**
 * Normalizes any variant identifier to canonical 'ka' | 'kha' | 'ga' | 'gha'
 * @param {unknown} raw
 * @returns {'ka' | 'kha' | 'ga' | 'gha' | null}
 */
export function normalizeCQSubpart(raw) {
  if (raw === null || raw === undefined) return null;
  const str = String(raw).trim().toLowerCase();

  // Ka variations: ক, ka, cq_ka, part_ka, (ক), (ka), (a), a, 1, ১
  if (
    str === 'ka' ||
    str === 'ক' ||
    str === '(ক)' ||
    str === 'cq_ka' ||
    str === 'part_ka' ||
    str === '(a)' ||
    str === 'a' ||
    str === '1' ||
    str === '১' ||
    str.startsWith('ka') ||
    str.includes('জ্ঞানমূলক')
  ) {
    return 'ka';
  }

  // Kha variations: খ, kha, cq_kha, part_kha, (খ), (kha), (b), b, 2, ২
  if (
    str === 'kha' ||
    str === 'খ' ||
    str === '(খ)' ||
    str === 'cq_kha' ||
    str === 'part_kha' ||
    str === '(b)' ||
    str === 'b' ||
    str === '2' ||
    str === '২' ||
    str.startsWith('kha') ||
    str.includes('অনুধাবন')
  ) {
    return 'kha';
  }

  // Ga variations: গ, ga, cq_ga, part_ga, (গ), (ga), (c), c, 3, ৩
  if (
    str === 'ga' ||
    str === 'গ' ||
    str === '(গ)' ||
    str === 'cq_ga' ||
    str === 'part_ga' ||
    str === '(c)' ||
    str === 'c' ||
    str === '3' ||
    str === '৩' ||
    str.startsWith('ga') ||
    str.includes('প্রয়োগ')
  ) {
    return 'ga';
  }

  // Gha variations: ঘ, gha, cq_gha, part_gha, (ঘ), (gha), (d), d, 4, ৪
  if (
    str === 'gha' ||
    str === 'ঘ' ||
    str === '(ঘ)' ||
    str === 'cq_gha' ||
    str === 'part_gha' ||
    str === '(d)' ||
    str === 'd' ||
    str === '4' ||
    str === '৪' ||
    str.startsWith('gha') ||
    str.includes('উচ্চতর')
  ) {
    return 'gha';
  }

  return null;
}

/**
 * Returns formatted bilingual label for a canonical subpart
 * @param {'ka' | 'kha' | 'ga' | 'gha' | null | undefined} subpart
 * @param {boolean} [useBangla=false]
 * @returns {string}
 */
export function getCQSubpartLabel(subpart, useBangla = false) {
  if (!subpart) return '';
  const meta = CQ_SUBPARTS[subpart];
  if (!meta) return '';
  return useBangla ? `(${meta.labelBn}) ${meta.titleBn}` : `(${meta.labelEn}) ${meta.titleEn}`;
}

/**
 * Returns the numerical mark weight for a canonical subpart (1, 2, 3, 4)
 * @param {'ka' | 'kha' | 'ga' | 'gha' | null | undefined} subpart
 * @returns {number}
 */
export function getCQSubpartMarks(subpart) {
  if (!subpart) return 0;
  return CQ_SUBPARTS[subpart]?.standardMarks ?? 0;
}

/**
 * Compares two subparts for strict canonical sorting: ক -> খ -> গ -> ঘ
 * @param {'ka' | 'kha' | 'ga' | 'gha' | null | undefined} a
 * @param {'ka' | 'kha' | 'ga' | 'gha' | null | undefined} b
 * @returns {number}
 */
export function compareCQSubparts(a, b) {
  const indexA = a ? CQ_SUBPART_ORDER.indexOf(a) : 999;
  const indexB = b ? CQ_SUBPART_ORDER.indexOf(b) : 999;
  return indexA - indexB;
}

/**
 * Groups an array of questions by their parentCqId (or individual ID if standalone)
 * Subparts within each group are strictly sorted: ক (Ka) -> খ (Kha) -> গ (Ga) -> ঘ (Gha)
 * @template T
 * @param {T[]} questions
 * @returns {any[]}
 */
export function groupQuestionsByParentCq(questions) {
  const map = new Map();

  for (const q of questions) {
    const key = q.parentCqId || q.id;
    if (!map.has(key)) {
      map.set(key, {
        parentCqId: key,
        board: q.board,
        year: q.year,
        stemEn: q.stemEn || q.questionEn || '',
        stemBn: q.stemBn || q.questionBn || '',
        subparts: [],
        sourceReference: q.sourceReference,
        sourceUrl: q.sourceUrl,
        discoverySource: q.discoverySource,
        languageVersion: q.languageVersion,
        verificationStatus: q.verificationStatus,
      });
    }
    map.get(key).subparts.push(q);
  }

  // Sort subparts inside each parent group
  const groupedArray = Array.from(map.values());
  for (let i = 0; i < groupedArray.length; i++) {
    groupedArray[i].subparts.sort((a, b) => compareCQSubparts(a.cqSubpart, b.cqSubpart));
  }

  return groupedArray;
}
