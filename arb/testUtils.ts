import { expect } from "chai";

export const bnToInt = (bn) => {
  return parseInt(bn.toString())
}

export const expectBn = (arg) => {
  return expect(bnToInt(arg))
}
