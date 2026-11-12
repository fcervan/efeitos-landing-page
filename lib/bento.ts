/**
 * Spans do bento: grupos que sempre somam 12 colunas.
 * O último grupo é ajustado ao que sobra para não deixar buraco na grade.
 */
const GROUPS: number[][] = [[6, 6], [4, 4, 4], [8, 4], [4, 8], [5, 7], [4, 4, 4], [7, 5]];

export function buildSpans(total: number): number[] {
  const spans: number[] = [];
  let index = 0;
  let group = 0;
  while (index < total) {
    const pattern = GROUPS[group % GROUPS.length] ?? [4, 4, 4];
    const remaining = total - index;
    if (remaining >= pattern.length) {
      spans.push(...pattern);
      index += pattern.length;
    } else if (remaining === 1) {
      spans.push(12);
      index += 1;
    } else if (remaining === 2) {
      spans.push(6, 6);
      index += 2;
    } else {
      spans.push(4, 4, 4);
      index += 3;
    }
    group += 1;
  }
  return spans;
}

export const SPAN_CLASS: Record<number, string> = {
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
  7: "lg:col-span-7",
  8: "lg:col-span-8",
  12: "lg:col-span-12",
};
