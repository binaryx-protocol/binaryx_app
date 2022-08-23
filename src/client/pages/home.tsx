import React, { useState } from 'react';
import { NextPage } from 'next';
import Navigation from 'components/navigation';
import s from '../app/components/navigation/styles.module.scss';
import MenuElement from 'components/pages/account_page/AccountMenu/MenuElement';

const Home: NextPage<{ data: string }> = (props) => {
  const { data } = props;

  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <div>
      <Navigation>
        <div className={s.headerWrapper}>
          <img src="#" alt="company_logo" className={s.logo} />
          <nav className={`${s.navLinks} ${showMenu ? '' : s.hidden} `}>
            <MenuElement link={'/marketplace'} body={'Marketplace'} />
            <MenuElement link={'#'} body={'About us'} />
            <MenuElement link={'#'} body={'Learn'} />
            <MenuElement link={'#'} body={'Blog'} />
            <MenuElement link={'#'} body={'Sell my property'} />
            <MenuElement link={'/account'} body={'Account'} />
            <MenuElement
              link={'#'}
              body={'View Marketplace'}
              className={s.viewMarketplace}
            />
          </nav>
          <div className={s.burgerMenuField} onClick={toggleMenu}>
            <div className={s.burgerShowMenu}></div>
          </div>
        </div>
      </Navigation>

      <h1>Hello from NextJS! - Home</h1>
      {data}
    </div>
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
