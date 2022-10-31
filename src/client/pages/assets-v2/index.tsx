import { NextPage } from 'next';
import {AdminAssetsListController} from "features/assets";
import {DefaultLayout} from "../../app/shared/layout/DefaultLayout";

const Assets = () => {
  return (
    <>
      <AdminAssetsListController />
    </>
  );
};

Assets.Layout = DefaultLayout;

// export const getStaticProps = async (sProps) => {
//   console.log('sProps', sProps)
//
//   return {
//     props: {},
//     revalidate: 60 * 5,
//   }
// }
//
// export const getStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: 'blocking',
//   }
// }

// Assets.getInitialProps = (iProps) => {
//   console.log('iProps', iProps)
//   return {
//     query: iProps.query
//   }
// };

export default Assets;
