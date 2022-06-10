export function parseToDecimal(x: number | string) {
  return Number.parseFloat(x as string).toFixed(2);
}
