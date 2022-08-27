import { useState } from 'react';
import { FC } from 'react';
import s from './styles.module.scss';
import MenuElement from '../pages/account_page/AccountMenu/MenuElement';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';

type Props = {
};

const Navigation: FC<Props> = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);
  const { pathname } = useRouter();

  if (pathname === "/account") {
    return null;
  }

  return (
    <header className={s.header}>
      <div className={s.headerWrapper}>
        <Container maxWidth="xl" className={s.container}>
          <img src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/common/logo_black_horizontal.svg" alt="company_logo" className={s.logo} />
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
        </Container>
      </div>
    </header>
  );
};

export default Navigation;
