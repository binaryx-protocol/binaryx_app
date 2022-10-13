import { expect } from "chai";

export const expectBn = (given, expected) => {
  expect(given.toString()).to.eq(expected.toString())
}

export const bnToInt = (bn) => {
  return parseInt(bn.toString())
}
