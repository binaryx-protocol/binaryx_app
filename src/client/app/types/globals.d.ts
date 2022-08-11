import MainContract from 'src/frontend/contracts/MainContract';
import UsnContract from 'src/frontend/contracts/UsnContract';

declare global {
  interface Window {
    mainContract: MainContract;
    usnContract: UsnContract;
  }
}

// declare module "*.module.less" {
//   const classes: { [key: string]: string };
//   export default classes;
// }
