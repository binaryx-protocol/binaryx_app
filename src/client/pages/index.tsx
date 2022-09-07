import { NextPage } from 'next';
import HomePageTemp from './home-page-temp';

const Home: NextPage<{ data: string }> = () => {
  return (
    <>
      <HomePageTemp />
    </>
  );
};

// Home.getInitialProps = ({ query }) => {
//   return {
//     data: `some initial props including query params and controller data: ${JSON.stringify(
//       query,
//     )}`,
//   };
// };

export default Home;
