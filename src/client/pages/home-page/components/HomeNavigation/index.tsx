import { FC } from 'react';
import s from './styles.module.scss';
import { Container } from '@mui/material';
import NavSocialImage from '../NavSocialImage';
import classNames from 'classnames';
import IconDiscord from '../NavSocialImage/IconDiscord';
import IconTwitter from '../NavSocialImage/IconTwitter';
import IconLinkedIn from '../NavSocialImage/IconLinkedIn';
import IconTelegram from '../NavSocialImage/IconTelegram';
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
          onClick={() => (window as Window).scrollTo(0, 0)}
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
            icon={<IconDiscord className={s.navSocialImage} />}
          />
          <NavSocialImage
            link={'https://twitter.com/realBinaryx'}
            icon={<IconTwitter className={s.navSocialImage} />}
          />
          <NavSocialImage
            link={'https://www.linkedin.com/company/realbinaryx/'}
            icon={<IconLinkedIn className={s.navSocialImage} />}
          />
          <NavSocialImage
            link={'https://t.me/binaryxnews'}
            icon={<IconTelegram className={s.navSocialImage} />}
          />
        </nav>
      </Container>
    </header>
  );
};

export default LandingNav;
