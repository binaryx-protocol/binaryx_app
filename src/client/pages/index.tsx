import { NextPage } from 'next';
import HomePage from './home-page';

const Home: NextPage<{ data: string }> = (props) => {
  const { data } = props;
  return (
    <>
      <HomePage /> {data}
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
