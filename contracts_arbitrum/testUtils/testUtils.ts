import { expect } from "chai";
import {BigNumber} from "ethers";

export const expectBn = (arg: BigNumber) => {
  return expect(arg.toNumber())
}
