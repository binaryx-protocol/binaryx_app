function formatLongNumber(number: number | string, options?: { digits: number }) {
  let value = typeof number === "string" ? parseFloat(number) : number;
  const { digits = 18 } = options || {};

  return value / (10 ** digits);
}

export default formatLongNumber;
