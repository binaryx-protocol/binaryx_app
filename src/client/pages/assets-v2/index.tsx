import { NextPage } from 'next';
import {AdminAssetsListController} from "features/assets";

const Assets: NextPage<any> = (props) => {
  return (
    <>
        {/*{JSON.stringify(props)}*/}
        <AdminAssetsListController />
    </>
  );
};

export const getStaticProps = async (sProps) => {
  console.log('sProps', sProps)

  return {
    props: {},
    revalidate: 60 * 5,
  }
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

// Assets.getInitialProps = (iProps) => {
//   console.log('iProps', iProps)
//   return {
//     query: iProps.query
//   }
// };

export default Assets;
