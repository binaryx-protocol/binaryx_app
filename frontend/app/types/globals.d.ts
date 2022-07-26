import AssetContract from 'src/frontend/contracts/AssetContract';
import UsnContract from 'src/frontend/contracts/UsnContract';
import MainContract from '../contracts/MainContract';
import {ChangeEvent, SyntheticEvent} from "react";

declare global {
  interface Window {
    assetContract: AssetContract;
    usnContract: UsnContract;
    mainContract: MainContract;
    ethereum?: any
  }
}

// export type UiInputChangeEvent = SyntheticEvent & { target: HTMLInputElement }
export type UiInputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

// declare module "*.module.less" {
//   const classes: { [key: string]: string };
//   export default classes;
// }
