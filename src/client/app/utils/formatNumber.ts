function formatLongNumber(number: number | string, options?: { digits?: number, toFixed?: number }) {
  let value = typeof number === "string" ? parseFloat(number) : number;
  const { digits = 18, toFixed } = options || {};
  const result = value / (10 ** digits);

  return toFixed ? result?.toFixed(toFixed) : result;
}

export default formatLongNumber;

export const truncateCents = (v: number): number => Math.floor(v*100) / 100
export const truncatePercentage = (v: number): number => Math.floor(v*1000) / 1000
