import Navigation from './components/LandingNavigation';
import { NextPage } from 'next';
import s from './styles.module.scss';
import SectionElement from './components/SectionElement';

const Home: NextPage<{ data: string }> = (props) => {
  const { data } = props;

  return (
    <>
      <Navigation />
      <div className={s.startPage}>
        <div className={s.startPageWrapper}>
          <main className={s.startPageInfo}>
            <h1 className={s.title}>
              Binaryx Community-powered Real Estate marketplace
            </h1>
            <div className={s.infoSection}>
              <p className={s.hint}>
                Powered on <u>NEAR</u>protocol
              </p>
              <button className={s.btnJoinWaitlist}>Join waitlist</button>
            </div>
          </main>
          <SectionElement heading="Change expensive asset value in Real Estate">
            <p className={s.description}>
              There is still needed a huge amount and knowledge to join a real
              estate market. With Binaryx and DeFi you will be able to: Buy a
              real tokenized estate with only 50$ till unlimited Have a way how
              to deversificate your investments and risks And many more
            </p>
          </SectionElement>
          <SectionElement heading="Liquidity in the illiquid market">
            <p className={s.description}>
              The second problem is a lack of liquidity in the real estate
              market in traditional finance In DeFi you will be able to sell
              your property fast, secure, and profitable
            </p>
          </SectionElement>
          <SectionElement heading="Boost economy">
            <p className={s.description}>
              Increasing assets ownership transferring speed with web3
              technologies Increasing assets ownership transferring speed with
              web3 technologies
            </p>
          </SectionElement>
        </div>
      </div>
      {data}
    </>
  );
};

Home.getInitialProps = ({ query }) => {
  return {
    data: `some initial props including query params and controller data: ${JSON.stringify(
      query,
    )}`,
  };
};

export default Home;
