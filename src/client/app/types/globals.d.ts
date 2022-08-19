import AssetContract from 'src/frontend/contracts/AssetContract';
import UsnContract from 'src/frontend/contracts/UsnContract';
import MainContract from '../contracts/MainContract';

declare global {
  interface Window {
    assetContract: AssetContract;
    usnContract: UsnContract;
    mainContract: MainContract;
  }
}

// declare module "*.module.less" {
//   const classes: { [key: string]: string };
//   export default classes;
// }
