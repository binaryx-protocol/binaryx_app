import { expect } from "chai";

export const bnToInt = (bn: any) => {
  return parseInt(bn.toString())
}

export const expectBn = (arg: any) => {
  return expect(bnToInt(arg))
}
