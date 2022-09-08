import Navigation from './components/HomeNavigation';
import { FC, useEffect, useRef } from 'react';
import SectionElement from './components/SectionElement';
import s from './styles.module.scss';
import TeamBlock from './components/TeamBlock';
import NavSocialImage from './components/NavSocialImage';
import MenuElement from 'components/pages/account_page/AccountMenu/MenuElement';
import lottie, { LottiePlayer } from 'lottie-web';
import BackgroundVisuals from './components/BackgroundVisuals';

const HomePage: FC = () => {
  const container = useRef<HTMLDivElement>(null);

  //! This useEffect implements changing animation on scroll
  // useEffect(() => {
  //   const animDuration = 1000;
  //   const anim = lottie.loadAnimation({
  //     container: container.current!,
  //     renderer: 'svg',
  //     loop: false,
  //     autoplay: false,
  //     animationData: require('../home-page-temp/animations/B1.json'),
  //   });

  //   const animatebodymovin = (duration: number) => {
  //     const scrollPosition = window.scrollY;
  //     const maxFrames = anim.totalFrames;
  //     const frame = (maxFrames / 1000) * (scrollPosition / (duration / 1000));
  //     anim.goToAndStop(frame, true);
  //   };

  //   const onScroll = () => {
  //     animatebodymovin(animDuration);
  //   };

  //   document.addEventListener('scroll', onScroll);

  //   return () => {
  //     anim.destroy();
  //     document.removeEventListener('scroll', onScroll);
  //   };
  // }, []);

  return (
    <>
      <div className={s.containerAnimation} ref={container}></div>

      <Navigation />
      <main className={s.heroPage}>
        <div className={s.heroPageWrapper}>
          <main className={s.heroPageInfo}>
            <h1 className={s.companyTitle}>
              <span>
                <b style={{ color: 'rgba(0, 180, 204, 1)' }}>Binaryx</b>
              </span>
              <span>Community-Powered</span>
              <span>Real Estate Marketplace</span>
            </h1>
            <p className={s.hint}>{/* Technology based */}</p>
            <div className={s.infoSection}>
              <button type="submit" className={s.btnJoinWaitlist}>
                Join waitlist
              </button>
              <button type="submit" className={s.joinCommunity}>
                Join our community
              </button>
            </div>
          </main>
          <SectionElement heading="Change Expensive Asset Value In Real Estate">
            <p className={s.description}>
              There is still needed a huge amount and knowledge to join a real
              estate market. With Binaryx and DeFi you will be able to: Buy a
              real tokenized estate with only 50$ till unlimited Have a way how
              to deversificate your investments and risks And many more
            </p>
          </SectionElement>
          <SectionElement heading="Liquidity In The Illiquid Market">
            <p className={s.description}>
              The second problem is a lack of liquidity in the real estate
              market in traditional finance In DeFi you will be able to sell
              your property fast, secure, and profitable
            </p>
          </SectionElement>
          <SectionElement heading="Boost Economy">
            <p className={s.description}>
              Increasing assets ownership transferring speed with web3
              technologies Increasing assets ownership transferring speed with
              web3 technologies
            </p>
          </SectionElement>
        </div>
        <div className={s.webAssets}>
          <div className={s.webAssetsWrapper}>
            <main className={s.assets}>
              <h1 className={s.assetsTitle}>
                Welcome to the era of WEB3 assets
              </h1>
              <img
                className={s.assetsProperty}
                style={{ border: '1px solid white' }}
                src="#"
                alt="#"
              />
              <BackgroundVisuals top={'50%'} />
            </main>
            <main className={s.ourTeam}>
              <h1 className={s.ourTeamTitle}>Our Team</h1>
              <div className={s.teamGallery}>
                <TeamBlock
                  imgSrc={
                    'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/team/oleg_kurchenko.png'
                  }
                  personName={'Oleg Kurchenko'}
                  personPosition={'Chief executive producer'}
                  socialLinkImage={
                    'https://cdn-icons-png.flaticon.com/512/61/61109.png'
                  }
                  socialLink={'#'}
                  socialUserName={'oleg_kurchenko'}
                />
                <TeamBlock
                  imgSrc={
                    'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/team/dmytro_zeleniy.png'
                  }
                  personName={'Dmytro Zeleniy'}
                  personPosition={'Chief Technical Officer'}
                  socialLinkImage={
                    'https://cdn-icons-png.flaticon.com/512/61/61109.png'
                  }
                  socialLink={'#'}
                  socialUserName={'dmytro_zeleniy'}
                />
                <TeamBlock
                  imgSrc={
                    'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/team/dmytro_lizanets.png'
                  }
                  personName={'Dmytro Lizanets'}
                  personPosition={'Chief Marketing Officer'}
                  socialLinkImage={
                    'https://cdn-icons-png.flaticon.com/512/61/61109.png'
                  }
                  socialLink={'#'}
                  socialUserName={'dmytro_lizanets'}
                />
                <TeamBlock
                  imgSrc={
                    'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/team/andriy_makaveli.png'
                  }
                  personName={'Andriy Makaveli'}
                  personPosition={'Chief Business Development Officer'}
                  socialLinkImage={
                    'https://cdn-icons-png.flaticon.com/512/61/61109.png'
                  }
                  socialLink={'#'}
                  socialUserName={'andriy_makaveli'}
                />
                <BackgroundVisuals top={'20%'} />
              </div>
            </main>
            <main className={s.joinWaitlist}>
              <div className={s.topSection}>
                <h2 className={s.joinWaitlistTitle}>Join Waitlist:</h2>
                <form className={s.formSection}>
                  <input
                    type="text"
                    className={s.input}
                    placeholder="Your name:"
                  />
                  <input
                    type="email"
                    className={s.input}
                    placeholder="Your email:"
                  />
                  <button type="submit" className={s.btnSend}>
                    Send
                  </button>
                </form>
              </div>
              <BackgroundVisuals top={'10%'} />
            </main>
          </div>
        </div>
        <div className={s.footerSection}>
          <div className={s.footerWrapper}>
            <footer className={s.footer}>
              <h1 className={s.footerHeading}>Let's Keep in Touch With:</h1>
              <nav className={s.footerNavSocial}>
                <NavSocialImage
                  link={'https://discord.gg/kJqgYh7G9G'}
                  src={
                    'https://cdn-icons-png.flaticon.com/512/5968/5968898.png'
                  }
                  alt={'discord'}
                  className={s.footerNavSocialImage}
                  width={46}
                />
                <NavSocialImage
                  link={'https://twitter.com/realBinaryx'}
                  src={'https://cdn-icons-png.flaticon.com/512/733/733635.png'}
                  alt={'twitter'}
                  className={s.footerNavSocialImage}
                  width={46}
                />
                <NavSocialImage
                  link={'https://www.linkedin.com/company/realbinaryx/'}
                  src={'https://cdn-icons-png.flaticon.com/512/61/61109.png'}
                  alt={'linkedIn'}
                  className={s.footerNavSocialImage}
                  width={46}
                />
                <NavSocialImage
                  link={'https://t.me/binaryxnews'}
                  src={
                    'https://cdn-icons-png.flaticon.com/512/2111/2111710.png'
                  }
                  alt={'telegram'}
                  className={s.footerNavSocialImage}
                  width={46}
                />
              </nav>
            </footer>
            <nav className={s.footerBottomSection}>
              <img
                src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/common/logo_black_horizontal.svg"
                alt="company_logo"
                className={s.footerLogo}
              />
              <div className={s.footerLinks}>
                <MenuElement link={'#'} body={'Privacy Policy'} />
                <MenuElement link={'#'} body={'Terms of service'} />
              </div>
              <span className={s.binaryx}>
                ©Binaryx. All rights reserved 2022
              </span>
            </nav>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
