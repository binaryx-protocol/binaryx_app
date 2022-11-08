import { expect } from "chai";
import {BigNumber} from "ethers";

export const bnToInt = (bn: BigNumber) => {
  return parseInt(bn.toString())
}

export const expectBn = (arg: BigNumber) => {
  return expect(bnToInt(arg))
}
