import {DefaultLayout} from "../../app/shared/layout/DefaultLayout";
import {CompanyBalanceController, MintUsdtController} from "../../app/features/tools";

const ToolsPage = () => {
  return (
    <>
      <MintUsdtController />
      <CompanyBalanceController />
    </>
  )
};

ToolsPage.Layout = DefaultLayout;

export default ToolsPage;
