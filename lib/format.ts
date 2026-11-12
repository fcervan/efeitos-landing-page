export const numberBR = (value: number): string => Math.round(value).toLocaleString("pt-BR");

export const decimalBR = (value: number, digits = 1): string =>
  value.toLocaleString("pt-BR", { minimumFractionDigits: digits, maximumFractionDigits: digits });

/** kB com uma casa, no padrão pt-BR (ex.: 187,4 kB). */
export const kbBR = (bytes: number): string => `${decimalBR(bytes / 1000, 1)} kB`;
