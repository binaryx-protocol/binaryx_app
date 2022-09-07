import { NextPage } from 'next';
import HomePageTemp from './home-page-temp';

const Home: NextPage<{ data: string }> = (props) => {
  const { data } = props;
  return (
    <>
      <HomePageTemp /> {data}
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
