import AssetContract from 'src/frontend/contracts/AssetContract';
import UsnContract from 'src/frontend/contracts/UsnContract';

declare global {
  interface Window {
    assetContract: AssetContract;
    usnContract: UsnContract;
  }
}

// declare module "*.module.less" {
//   const classes: { [key: string]: string };
//   export default classes;
// }
