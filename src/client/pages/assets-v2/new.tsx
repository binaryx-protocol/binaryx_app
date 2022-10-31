import {NewAssetController} from "features/assets";
import {DefaultLayout} from "../../app/shared/layout/DefaultLayout";

const Assets = () => {
  return (
    <>
      <NewAssetController />
    </>
  );
};

Assets.Layout = DefaultLayout;

export default Assets;
