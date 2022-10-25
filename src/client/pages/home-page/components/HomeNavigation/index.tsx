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
  const headerRef = useRef<HTMLDivElement>(null);
  const btnBurgerMenuRef = useRef<HTMLDivElement>(null);
  const [isTransparentBg, setIsTransparentBg] = useState(true);
  const [headerOpened, setHeaderIsOpened] = useState(false);

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

  const onClickLogo = () => {
    (window as Window).scrollTo(0, 0);
    if (headerOpened) {
      onClickBurgerMenu();
    }
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
      <div className={s.navContainer}>
        <div className={s.logoWrap}>
          <img
            src={`https://binaryxestate.s3.eu-central-1.amazonaws.com/images/common/logo_${
              !isDark ? 'black' : 'white'
            }_horizontal.svg`}
            alt="company_logo"
            className={classNames(s.logo)}
            onClick={onClickLogo}
          />
          <div onClick={onClickBurgerMenu} className={s.btnBurgerMenuClickable}>
            <div ref={btnBurgerMenuRef} className={s.btnBurgerMenu}></div>
          </div>
        </div>
      </div>
      <Container maxWidth="xl" className={s.container}>
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
            icon={<IconDiscord />}
          />
          <NavSocialImage
            link={'https://twitter.com/BinaryxProtocol'}
            icon={<IconTwitter />}
          />
          <NavSocialImage
            link={'https://www.linkedin.com/company/realbinaryx/'}
            icon={<IconLinkedIn />}
          />
          <NavSocialImage
            link={'https://t.me/binaryxnews'}
            icon={<IconTelegram />}
          />
        </nav>
      </Container>
    </header>
  );
};

export default LandingNav;
