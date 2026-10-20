/**
 * Canonical Bangladesh HSC Creative Question (CQ) Subpart Normalization & Utilities
 * 
 * Standard NCTB Structure:
 * - ক (Ka)  : জ্ঞানমূলক (Knowledge)       - 1 Mark
 * - খ (Kha) : অনুধাবনমূলক (Comprehension) - 2 Marks
 * - গ (Ga)  : প্রয়োগমূলক (Application)     - 3 Marks
 * - ঘ (Gha) : উচ্চতর দক্ষতা (Higher Ability)- 4 Marks
 */

export type CanonicalCQSubpart = 'ka' | 'kha' | 'ga' | 'gha';

export interface CQSubpartMeta {
  id: CanonicalCQSubpart;
  labelBn: 'ক' | 'খ' | 'গ' | 'ঘ';
  labelEn: 'Ka' | 'Kha' | 'Ga' | 'Gha';
  titleBn: string;
  titleEn: string;
  standardMarks: number;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
}

export const CQ_SUBPARTS: Record<CanonicalCQSubpart, CQSubpartMeta> = {
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

export const CQ_SUBPART_ORDER: readonly CanonicalCQSubpart[] = ['ka', 'kha', 'ga', 'gha'] as const;

/**
 * Normalizes any variant identifier to canonical 'ka' | 'kha' | 'ga' | 'gha'
 */
export function normalizeCQSubpart(raw: unknown): CanonicalCQSubpart | null {
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
 */
export function getCQSubpartLabel(subpart: CanonicalCQSubpart | null | undefined, useBangla = false): string {
  if (!subpart) return '';
  const meta = CQ_SUBPARTS[subpart];
  if (!meta) return '';
  return useBangla ? `(${meta.labelBn}) ${meta.titleBn}` : `(${meta.labelEn}) ${meta.titleEn}`;
}

/**
 * Returns the numerical mark weight for a canonical subpart (1, 2, 3, 4)
 */
export function getCQSubpartMarks(subpart: CanonicalCQSubpart | null | undefined): number {
  if (!subpart) return 0;
  return CQ_SUBPARTS[subpart]?.standardMarks ?? 0;
}

/**
 * Compares two subparts for strict canonical sorting: ক -> খ -> গ -> ঘ
 */
export function compareCQSubparts(a: CanonicalCQSubpart | null | undefined, b: CanonicalCQSubpart | null | undefined): number {
  const indexA = a ? CQ_SUBPART_ORDER.indexOf(a) : 999;
  const indexB = b ? CQ_SUBPART_ORDER.indexOf(b) : 999;
  return indexA - indexB;
}

export interface GroupedCQItem {
  parentCqId: string;
  board: string;
  year: number;
  stemEn: string;
  stemBn: string;
  subparts: any[];
  sourceReference: string;
  sourceUrl?: string;
  discoverySource?: string;
  languageVersion?: 'English Version' | 'Bangla Version';
  verificationStatus: string;
}

/**
 * Groups an array of questions by their parentCqId (or individual ID if standalone)
 * Subparts within each group are strictly sorted: ক (Ka) -> খ (Kha) -> গ (Ga) -> ঘ (Gha)
 */
export function groupQuestionsByParentCq<T extends { id: string; parentCqId?: string; cqSubpart?: CanonicalCQSubpart; stemEn?: string; stemBn?: string; questionEn?: string; questionBn?: string; board: string; year: number; sourceReference: string; sourceUrl?: string; discoverySource?: string; languageVersion?: 'English Version' | 'Bangla Version'; verificationStatus: string }>(
  questions: T[]
): GroupedCQItem[] {
  const map = new Map<string, GroupedCQItem>();

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
    map.get(key)!.subparts.push(q);
  }

  // Sort subparts inside each parent group
  const groupedArray = Array.from(map.values());
  for (let i = 0; i < groupedArray.length; i++) {
    groupedArray[i].subparts.sort((a: any, b: any) => compareCQSubparts(a.cqSubpart, b.cqSubpart));
  }

  return groupedArray;
}
