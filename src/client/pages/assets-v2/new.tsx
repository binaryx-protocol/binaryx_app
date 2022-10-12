import { NextPage } from 'next';
import {NewAssetController} from "features/assets";

const Assets: NextPage<any> = () => {
  return (
    <>
        <NewAssetController />
    </>
  );
};

export default Assets;
