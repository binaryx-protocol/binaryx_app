import {DefaultLayout} from "../../app/shared/layout/DefaultLayout";
import {MintUsdtController} from "../../app/features/tools/controllers/MintUsdtController";

const ToolsPage = () => {
  return (
    <MintUsdtController />
  )
};

ToolsPage.Layout = DefaultLayout;

export default ToolsPage;
