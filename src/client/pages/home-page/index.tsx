import Navigation from './components/HomeNavigation';
import { FC, useEffect, useRef, useState } from 'react';
import SectionElement from './components/SectionElement';
import s from './styles.module.scss';
import TeamBlock from './components/TeamBlock';
import NavSocialImage from './components/NavSocialImage';
import MenuElement from 'components/pages/account_page/AccountMenu/MenuElement';
import lottie from 'lottie-web';
import BackgroundVisuals from './components/BackgroundVisuals';
import anim1 from './animations/B1.json';
import anim2 from './animations/B2.json';
import anim3 from './animations/B3.json';
import anim4 from './animations/B4.json';
import WebAssetBlock from './components/WebAssetSection/WebAssetBlock';
import WebAssetCard from './components/WebAssetSection/WebAssetCard';
import classNames from 'classnames';

const HomePage: FC = () => {
  const container0 = useRef<HTMLDivElement>(null);
  const container1 = useRef<HTMLDivElement>(null);
  const container2 = useRef<HTMLDivElement>(null);
  const container3 = useRef<HTMLDivElement>(null);
  const animations = useRef([]);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);
  const getSections = () => [
    section1Ref.current,
    section2Ref.current,
    section3Ref.current,
    section4Ref.current,
  ];
  const currentSectionRef = useRef(0);
  const [isBgOverlayActive, setIsBgOverlayActive] = useState(false);
  const [isBgOverlayDark, setIsBgOverlayDark] = useState(false);

  const initAnimation = ({ animationData, container, autoplay }) => {
    return lottie.loadAnimation({
      container,
      renderer: 'canvas',
      loop: false,
      autoplay,
      animationData,
      rendererSettings: {
        // preserveAspectRatio: 'xMidYMid meet',
        preserveAspectRatio: 'xMaxYMax meet',
      },
    });
  };

  const getCurrentSection = () => {
    if (typeof window === 'undefined') {
      return 0;
    }

    if (window.scrollY <= 5) {
      return 0;
    }

    // let result =

    for (const [index, section] of getSections().entries() as any) {
      const scrollPosition = window.scrollY - (section?.offsetTop - 95);
      if (scrollPosition > 0 && scrollPosition < section.clientHeight) {
        if (index === 3) {
          return 3;
        }
        return index + 1;
      }
    }

    return 3;
  };

  function getCurrentSectionV2() {
    return currentSectionRef.current;
  }

  const playAnimation = (animationIndex: number) => {
    if (animationIndex === 0) {
      return;
    }
    console.log('playanimation start ' + animationIndex);

    const animation = animations.current[animationIndex];
    const section = getSections()[animationIndex - 1];
    let offsetTop = section?.offsetTop;
    let height = section?.clientHeight;

    if (section && animation) {
      const scrollPosition = window.scrollY - (offsetTop - 95);
      const scrollPercent = (scrollPosition * 100) / height;

      const maxFrames = animation.totalFrames;
      let frame = (maxFrames * scrollPercent) / 100;

      if (frame > maxFrames) {
        frame = maxFrames;
      }

      animation.goToAndStop(frame, true);

      console.log(
        'playanimation ' + animationIndex,
        frame,
        maxFrames,
        scrollPosition,
        scrollPercent,
      );
    }
  };

  useEffect(() => {
    animations.current[0] = initAnimation({
      animationData: anim1,
      container: container0.current,
      autoplay: true,
    });
    animations.current[1] = initAnimation({
      animationData: anim2,
      container: container1.current,
      autoplay: false,
    });
    animations.current[2] = initAnimation({
      animationData: anim3,
      container: container2.current,
      autoplay: false,
    });
    animations.current[3] = initAnimation({
      animationData: anim4,
      container: container3.current,
      autoplay: false,
    });

    document.addEventListener('scroll', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const currentSection = getCurrentSection();
      console.log('scroll', event);
      if (currentSection <= 1) {
        return;
      }
      console.log('currentSection', currentSection);
      updateContainerStyles();

      playAnimation(currentSection);
      // handleSectionScroll();
      // section3Ref.current.scrollIntoView();
    });

    updateContainerStyles();
    // handleSectionScroll();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      import('fullpage.js').then((module) => {
        const fullpage = module.default;

        new fullpage('#main', {
          //options here
          autoScrolling: true,
          scrollHorizontally: true,
          scrollingSpeed: 1500,
          fitToSectionDelay: 0,
          css3: true,
          // normalScrollElements: "#sectionWaitlist, #sectionTeam",
          onLeave: (origin, _, direction) => {
            console.log('origin', origin);
            const nextSection =
              direction === 'down' ? origin.index + 1 : origin.index - 1;
            updateContainerStylesV2(nextSection);
            currentSectionRef.current = nextSection;
            const animation = animations.current[nextSection];
            const nextValue =
              nextSection === 1 && direction === 'up' ? 1000 : 0;
            animation?.goToAndPlay(nextValue);
            console.log('nextSection', nextSection);
            const isBgAnimationActive = nextSection !== 0;
            setIsBgOverlayActive(() => isBgAnimationActive);
            setIsBgOverlayDark(() => nextSection >= 4);
          },
        });
      });
    }, 1000);
  }, []);

  function handleSectionScroll() {
    const currentSection = getCurrentSection();
    const section = getSections()[currentSection + 1];
    section?.scrollIntoView();
  }

  function updateContainerStyles() {
    const currentSection = getCurrentSection();

    if (container0.current) {
      container0.current.style.display =
        currentSection === 0 ? 'block' : 'none';
      container1.current.style.display =
        currentSection === 1 ? 'block' : 'none';
      container2.current.style.display =
        currentSection === 2 ? 'block' : 'none';
      container3.current.style.display =
        currentSection === 3 ? 'block' : 'none';
    }
  }

  function updateContainerStylesV2(currentSection) {
    if (container0.current) {
      container0.current.style.display =
        currentSection === 0 ? 'block' : 'none';
      container1.current.style.display =
        currentSection === 1 ? 'block' : 'none';
      container2.current.style.display =
        currentSection === 2 ? 'block' : 'none';
      container3.current.style.display =
        currentSection === 3 ? 'block' : 'none';
    }
  }

  // useEffect(() => {
  //   const webAssets = document.querySelectorAll('.styles_isShow__g-Dv6');

  //   const observer = new IntersectionObserver((entries) =>
  //     entries.forEach((entry) => {
  //       setTimeout(() => {
  //         entry.target.classList.toggle(
  //           'styles_isShow__g-Dv6',
  //           entry.isIntersecting,
  //         );
  //       }, 600);
  //       if (entry.isIntersecting) observer.unobserve(entry.target);
  //     }),
  //   );

  //   webAssets.forEach((elem) => observer.observe(elem));
  // }, []);

  return (
    <>
      <Navigation />
      <div
        className={classNames(s.bgOverlay, {
          [s.bgOverlayActive]: isBgOverlayActive,
          [s.bgOverlayDark]: isBgOverlayDark,
        })}
      >
        <div className={s.bgOverlayItem1} />
        <div className={s.bgOverlayItem2} />
        <div className={s.bgOverlayItem3} />
      </div>
      <div className={s.containerAnimation} ref={container0} />
      <div className={s.containerAnimation} ref={container1} />
      <div className={s.containerAnimation} ref={container2} />
      <div className={s.containerAnimation} ref={container3} />

      <main id="main" className={s.heroPage}>
        <div
          id="section1"
          ref={section1Ref}
          className={classNames('section', s.section)}
        >
          <div className={s.wrapper}>
            <section className={s.heroPageInfo}>
              <h1 className={s.companyTitle}>
                <span>
                  <b style={{ color: 'rgba(0, 180, 204, 1)' }}>
                    Binaryx Protocol
                  </b>
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
            </section>
          </div>
        </div>
        <div
          id="section2"
          ref={section2Ref}
          className={classNames(s.wrapper, s.section, 'section')}
        >
          <SectionElement heading="Expensive asset value already in past">
            <p className={s.description}>
              With Binaryx Protocol you will be able to buy a real tokenized
              estate with only 50$ till unlimited.
              <br />
              Buy, trade and sell your property fast, secure, and profitable at
              anytime
            </p>
          </SectionElement>
        </div>
        <div
          id="section3"
          ref={section3Ref}
          className={classNames(s.wrapper, s.section, 'section')}
        >
          <SectionElement heading="The next generation DeFi experience with Real Yield">
            <p className={s.description}>
              Use your property tokens to borrow and keep earning the highest
              yield available at the same time
            </p>
          </SectionElement>
        </div>
        <div
          id="section4"
          ref={section4Ref}
          className={classNames(s.wrapper, s.section, 'section')}
        >
          <SectionElement
            heading="Boost Economy and scale Web3"
            preTitle="WE ARE HERE TO:"
          >
            <p className={s.description}>
              Increasing assets ownership transferring speed with web3
              infrastracture
            </p>
          </SectionElement>
        </div>
        <section
          id="sectionWebAssets"
          className={classNames(
            s.wrapper,
            s.section,
            s.assets,
            s.webAssets,
            'section',
          )}
        >
          <div className={s.webAssetsContainer}>
            <div className={s.webAssetsContainerInner}>
              <h1 className={`${s.assetsTitle} ${s.assetsWeb3Mobile}`}>
                Welcome to the Era of Web3 assets
              </h1>
              <BackgroundVisuals top={'50%'} />
              <div className={s.webAssetBlock}>
                <img
                  className={`${s.assetsWeb3Desktop}`}
                  src={
                    'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/common/web3_section_temporary_desktop.svg'
                  }
                />
                {/* <img
                    className={s.assetsWeb3Mobile}
                    src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/common/web3_section_temporary_mobile.svg"
                  /> */}
                <div className={s.assetsWeb3Mobile}>
                  <WebAssetBlock className={s.webAssetsLegend}>
                    <p>1. Property Tokenization</p>
                    <p>2. Purchasing Property Tokens</p>
                    <p>3. Claiming Rewards from Rent</p>
                  </WebAssetBlock>
                  <WebAssetBlock className={s.binaryxMarketplace}>
                    <WebAssetCard
                      imageSrc={''}
                      imageDescription={'Binaryx Marketplace'}
                    />
                  </WebAssetBlock>
                  <WebAssetBlock className={s.propertyTokenization}>
                    <WebAssetCard imageSrc={''} imageDescription={'Property'} />
                    <WebAssetCard
                      imageSrc={'#'}
                      imageDescription={'Property Tokens'}
                    />
                  </WebAssetBlock>
                  <WebAssetBlock className={s.purchasingPropertyTokens}>
                    <WebAssetCard
                      imageSrc={'#'}
                      imageDescription={'Property Taken'}
                    />
                    <WebAssetCard imageSrc={'#'} imageDescription={'Stablecoins'} />
                    <WebAssetCard imageSrc={'#'} imageDescription={'Users'} />
                  </WebAssetBlock>
                  <WebAssetBlock className={s.claimingRewards}>
                    <WebAssetCard
                      imageSrc={'#'}
                      imageDescription={'Property Rent'}
                    />
                  </WebAssetBlock>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="sectionTeam"
          className={classNames(s.section, s.ourTeam, 'section')}
        >
          <div className={s.ourTeamContainer}>
            <div className={s.ourTeamContainerInner}>
              <h1 className={s.ourTeamTitle}>Our Team</h1>
              <div className={classNames(s.teamGallery, s.wrapper)}>
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
                {/* <BackgroundVisuals top={'40%'} /> */}
              </div>
            </div>
          </div>
        </section>
        <section
          id="sectionWaitlist"
          className={classNames(s.section, s.joinWaitlist, 'section')}
        >
          <div className={s.joinWaitlistContainer}>
            <div className={classNames(s.topSection)}>
              <div className={classNames(s.wrapper, s.topSectionContainer)}>
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
                  <label className={s.privacyPolicy}>
                    <input type="checkbox" />
                    <span>Agree to the Privacy Policy and Terms of Service</span>
                  </label>
                </form>
              </div>
            </div>
            {/* <BackgroundVisuals top={'10%'} /> */}
            {/*</section>*/}
            {/*<section className={classNames(s.section, s.footerSection, "section")}>*/}
            <footer className={s.footer}>
              <div className={s.footerContainer}>
                <h1 className={s.footerHeading}>Let's Keep in Touch With:</h1>
                <nav className={s.footerNavSocial}>
                  <NavSocialImage
                    link={'https://discord.gg/kJqgYh7G9G'}
                    src={
                      'https://cdn-icons-png.flaticon.com/512/5968/5968898.png'
                    }
                    alt={'discord'}
                    className={s.footerNavSocialImage}
                    width={40}
                  />
                  <NavSocialImage
                    link={'https://twitter.com/realBinaryx'}
                    src={'https://cdn-icons-png.flaticon.com/512/733/733635.png'}
                    alt={'twitter'}
                    className={s.footerNavSocialImage}
                    width={40}
                  />
                  <NavSocialImage
                    link={'https://www.linkedin.com/company/realbinaryx/'}
                    src={'https://cdn-icons-png.flaticon.com/512/61/61109.png'}
                    alt={'linkedIn'}
                    className={s.footerNavSocialImage}
                    width={40}
                  />
                  <NavSocialImage
                    link={'https://t.me/binaryxnews'}
                    src={
                      'https://cdn-icons-png.flaticon.com/512/2111/2111710.png'
                    }
                    alt={'telegram'}
                    className={s.footerNavSocialImage}
                    width={40}
                  />
                </nav>
              </div>
            </footer>
            <nav className={s.footerBottomSection}>
              <div className={s.footerBottomSectionContainer}>
                <img
                  src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/common/logo_black_horizontal.svg"
                  alt="company_logo"
                  width={180}
                />
                <div className={s.footerLinks}>
                  <MenuElement link={'#'} body={'Privacy Policy'} />
                  <MenuElement link={'#'} body={'Terms of service'} />
                </div>
                <span className={s.binaryx}>
                  ©Binaryx. All rights reserved 2022
                </span>
              </div>
            </nav>
          </div>
        </section>
      </main>
    </>
  );
};


export default HomePage;
