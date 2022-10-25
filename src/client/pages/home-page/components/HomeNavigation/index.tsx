import { FC, useEffect, useRef, useState } from 'react';
import s from './styles.module.scss';
import { Container } from '@mui/material';
import NavSocialImage from '../NavSocialImage';
import classNames from 'classnames';
import IconDiscord from '../NavSocialImage/IconDiscord';
import IconTwitter from '../NavSocialImage/IconTwitter';
import IconLinkedIn from '../NavSocialImage/IconLinkedIn';
import IconTelegram from '../NavSocialImage/IconTelegram';
import MenuElement from 'components/pages/account_page/AccountMenu/MenuElement';

type Props = {
  isDark?: boolean;
};

const LandingNav: FC<Props> = ({ isDark }) => {
  const isTransparentBgRef = useRef(true);
  const [isTransparentBg, setIsTransparentBg] = useState(true);
  const [headerOpened, setHeaderIsOpened] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const btnBurgerMenuRef = useRef<HTMLDivElement>(null);
  const onClickBurgerMenu = () => {
    setHeaderIsOpened(!headerOpened);
    if (!headerOpened) {
      headerRef.current?.classList.toggle(s.opened);
      btnBurgerMenuRef.current?.classList.toggle(s.opened);
    } else {
      headerRef.current?.classList.toggle(s.opened);
      btnBurgerMenuRef.current?.classList.toggle(s.closing);
      setTimeout(
        () => btnBurgerMenuRef.current?.classList.toggle(s.closing),
        500,
      );
      btnBurgerMenuRef.current?.classList.toggle(s.opened);
    }
    document.body.style.overflow = !headerOpened ? 'hidden' : 'scroll';
  };

  useEffect(() => {
    document.addEventListener('scroll', () => {
      // console.log('scroll', window.scrollY);
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
    });
  }, []);

  return (
    <header
      ref={headerRef}
      className={classNames(s.header, {
        [s.headerDark]: isDark,
        [s.headerTransparent]: isTransparentBg,
      })}
    >
      <Container maxWidth="xl" className={s.container}>
        <div className={s.logoWrap}>
          <img
            src={`https://binaryxestate.s3.eu-central-1.amazonaws.com/images/common/logo_white_horizontal.svg`}
            alt="company_logo"
            className={classNames(s.logo, { [s.logoActive]: isDark })}
            onClick={() => {
              (window as Window).scrollTo(0, 0);
              if (headerOpened) {
                onClickBurgerMenu();
              }
            }}
          />
          <img
            src={`https://binaryxestate.s3.eu-central-1.amazonaws.com/images/common/logo_black_horizontal.svg`}
            alt="company_logo"
            className={classNames(s.logo, { [s.logoActive]: !isDark })}
            onClick={() => {
              (window as Window).scrollTo(0, 0);
              if (headerOpened) {
                onClickBurgerMenu();
              }
            }}
          />
          <div onClick={onClickBurgerMenu} className={s.btnBurgerMenuClickable}>
            <div ref={btnBurgerMenuRef} className={s.btnBurgerMenu}></div>
          </div>
        </div>
        <nav className={s.navLinks}>
          <hr className={s.separator} />
          <MenuElement link={'/home'} body={'Home'} />
          <hr className={s.separator} />
          <MenuElement link={'#'} body={'About'} />
          <hr className={s.separator} />
          <MenuElement link={'#'} body={'Learn'} />
          <hr className={s.separator} />
          <MenuElement link={'#'} body={'More'} />
          <hr className={s.separator} />
          <MenuElement link={'#'} body={'Company'} />
          <hr className={s.separator} />
        </nav>
        <nav className={s.navSocial}>
          <NavSocialImage
            link={'https://discord.gg/kJqgYh7G9G'}
            icon={<IconDiscord className={s.navSocialImage} />}
          />
          <NavSocialImage
            link={'https://twitter.com/BinaryxProtocol'}
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
