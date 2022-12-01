import { NextPage } from 'next';
import LandingPage from '../app/features/landing/controllers';

const Home: NextPage<{ data: string }> = (_) => {
  return (
    <>
      <LandingPage />
    </>
  );
};

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

// Home.getInitialProps = ({ query }) => {
//   return {
//     data: `some initial props including query params and controller data: ${JSON.stringify(
//       query,
//     )}`,
//   };
// };

export default Home;
