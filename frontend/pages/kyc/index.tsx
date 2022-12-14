import {DefaultLayout} from "../../app/shared/layout/DefaultLayout";
import {KycController} from "../../app/features/kyc";

const KycPage = () => {
  return <>
    <KycController />
  </>
};

KycPage.Layout = DefaultLayout;

export default KycPage;
