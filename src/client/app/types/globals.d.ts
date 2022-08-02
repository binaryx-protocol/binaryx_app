import MainContract from "./src/frontend/contracts/MainContract";

declare global {
  interface Window {
    mainContract: MainContract;
  }
}

// declare module "*.module.less" {
//   const classes: { [key: string]: string };
//   export default classes;
// }
