import {AccountController} from "../../app/features/account";
import {DefaultLayout} from "../../app/shared/layout/DefaultLayout";

const AccountV2 = () => {
  return (
    <AccountController />
  )
};

AccountV2.Layout = DefaultLayout;

export default AccountV2;
