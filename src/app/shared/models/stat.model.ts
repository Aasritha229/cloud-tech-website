export interface Stat {
  id: string;
  targetValue: number;
  suffix: string;         // e.g. '+', '%', 'ms'
  label: string;          // ≤ 8 words
}
