import { NextPage } from 'next';
import {NewAssetController} from "features/assets";
import {HeaderController} from "../../app/shared/header";

const Assets: NextPage<any> = () => {
  return (
    <>
      <HeaderController />
      <NewAssetController />
    </>
  );
};

export default Assets;
