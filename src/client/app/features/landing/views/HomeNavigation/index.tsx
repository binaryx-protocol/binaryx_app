// @ts-nocheck
import { FC, useEffect, useRef, useState } from 'react';
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
  const isTransparentBgRef = useRef(true);
  const [isTransparentBg, setIsTransparentBg] = useState(true);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      console.log("scroll", window.scrollY);
      if (window.scrollY > 0) {
        if (isTransparentBgRef.current) {
          isTransparentBgRef.current = false;
          setIsTransparentBg(() => false);
        }
      } else {
        if (!isTransparentBgRef.current) {
          isTransparentBgRef.current = true;
          setIsTransparentBg(() => true);
        }
      }
    })
  }, []);

  return (
    <header className={classNames(s.header, { [s.headerDark]: isDark, [s.headerTransparent]: isTransparentBg })}>
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
            link={'https://discord.gg/f4mTchBKC8'}
            icon={<IconDiscord className={s.navSocialImage} />}
          />
          <NavSocialImage
            link={'https://twitter.com/BinaryxProtocol'}
            icon={<IconTwitter className={s.navSocialImage} />}
          />
          <NavSocialImage
            link={'https://www.linkedin.com/company/binaryxprotocol/'}
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
