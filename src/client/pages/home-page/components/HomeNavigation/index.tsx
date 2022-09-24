import { FC } from 'react';
import s from './styles.module.scss';
import { Container } from '@mui/material';
import NavSocialImage from '../NavSocialImage';
import classNames from 'classnames';
// import MenuElement from 'components/pages/account_page/AccountMenu/MenuElement';

type Props = {
  isDark?: boolean;
};

const LandingNav: FC<Props> = ({ isDark }) => {
  return (
    <header className={classNames(s.header, { [s.headerDark]: isDark })}>
      <Container maxWidth="xl" className={s.container}>
        <div
          className={s.logoWrap}
          onClick={() => (window as any).fullpageObject.moveTo(1)}
        >
          <img
            src={`https://binaryxestate.s3.eu-central-1.amazonaws.com/images/common/logo_white_horizontal.svg`}
            alt="company_logo"
            className={classNames(s.logo, { [s.logoActive]: isDark })}
          />
          <img
            src={`https://binaryxestate.s3.eu-central-1.amazonaws.com/images/common/logo_black_horizontal.svg`}
            alt="company_logo"
            className={classNames(s.logo, { [s.logoActive]: !isDark })}
          />
        </div>
        {/* <nav className={s.navLinks}>
          <MenuElement link={'/home'} body={'Home'} />
          <MenuElement link={'#'} body={'About'} />
          <MenuElement link={'#'} body={'Learn'} />
          <MenuElement link={'#'} body={'More'} />
          <MenuElement link={'#'} body={'Company'} />
        </nav> */}
        <nav className={s.navSocial}>
          <NavSocialImage
            link={'https://discord.gg/kJqgYh7G9G'}
            src={'https://cdn-icons-png.flaticon.com/512/5968/5968898.png'}
            alt={'discord'}
            className={s.navSocialImage}
            width={25}
          />
          <NavSocialImage
            link={'https://twitter.com/realBinaryx'}
            src={'https://cdn-icons-png.flaticon.com/512/733/733635.png'}
            alt={'twitter'}
            className={s.navSocialImage}
            width={25}
          />
          <NavSocialImage
            link={'https://www.linkedin.com/company/realbinaryx/'}
            src={'https://cdn-icons-png.flaticon.com/512/61/61109.png'}
            alt={'linkedIn'}
            className={s.navSocialImage}
            width={25}
          />
          <NavSocialImage
            link={'https://t.me/binaryxnews'}
            src={'https://cdn-icons-png.flaticon.com/512/2111/2111710.png'}
            alt={'telegram'}
            className={s.navSocialImage}
            width={25}
          />
        </nav>
      </Container>
    </header>
  );
};

export default LandingNav;
