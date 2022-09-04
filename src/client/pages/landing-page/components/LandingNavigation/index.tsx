import { FC } from 'react';
import MenuElement from 'components/pages/account_page/AccountMenu/MenuElement';
import s from './styles.module.scss';
import { Container } from '@mui/material';
import NavSocialImage from '../NavSocialImage';

const LandingNav: FC = () => {
  return (
    <header className={s.header}>
      <Container maxWidth="xl" className={s.container}>
        <img
          src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/common/logo_black_horizontal.svg"
          alt="company_logo"
          className={s.logo}
        />
        <nav className={s.navLinks}>
          <MenuElement link={'/'} body={'Home'} />
          <MenuElement link={'#'} body={'About'} />
          <MenuElement link={'#'} body={'Learn'} />
          <MenuElement link={'#'} body={'More'} />
          <MenuElement link={'#'} body={'Company'} />
        </nav>
        <nav className={s.navSocial}>
          <NavSocialImage
            link={'#'}
            src={'https://cdn-icons-png.flaticon.com/512/5968/5968898.png'}
            alt={'discord'}
            className={s.navSocialImage}
          />
          <NavSocialImage
            link={'#'}
            src={'https://cdn-icons-png.flaticon.com/512/733/733635.png'}
            alt={'twitter'}
            className={s.navSocialImage}
          />
          <NavSocialImage
            link={'#'}
            src={'https://cdn-icons-png.flaticon.com/512/61/61109.png'}
            alt={'linkedIn'}
            className={s.navSocialImage}
          />
          <NavSocialImage
            link={'#'}
            src={'https://cdn-icons-png.flaticon.com/512/2111/2111710.png'}
            alt={'telegram'}
            className={s.navSocialImage}
          />
        </nav>
      </Container>
    </header>
  );
};

export default LandingNav;
