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

// Home.getInitialProps = ({ query }) => {
//   return {
//     data: `some initial props including query params and controller data: ${JSON.stringify(
//       query,
//     )}`,
//   };
// };

export default Home;
