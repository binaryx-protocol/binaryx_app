import {BigNumber} from "ethers";

export const onlyFields = <T>(object: any): T => Object.entries(object).reduce((acc, [name, value]) => {
  if (!name.match(/^[0-9]+$/)) {
    acc[name] = value;
  }
  if (isObject(acc[name])) {
    acc[name] = onlyFields(acc[name])
  }
  return acc;
}, {} as any) as T

const isObject = (v: any) => typeof v === 'object' && Object.keys(v).some(k => !k.match(/^[0-9]+$/))

export const bnToInt = (bn: BigNumber) => {
  return parseInt(bn._hex, 16)
}
