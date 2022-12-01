// @ts-nocheck
import Navigation from '../views/HomeNavigation';
import { FC, useEffect, useRef, useState } from 'react';
import SectionElement from '../views/SectionElement';
import s from './styles.module.scss';
import TeamBlock from 'features/landing/views/TeamBlock';
import NavSocialImage from '../views/NavSocialImage';
import MenuElement from '../../../components/pages/account_page/AccountMenu/MenuElement';
import lottie from 'lottie-web';
import classNames from 'classnames';
import getCookie from 'utils/getCookie';
import SchemaSection from '../views/WebAssetSection/SchemaSection';
import TimelineSection from '../views/TimelineSection';
import BgOverlay from 'features/landing/views/BgOverlay';
import PopupMenu from 'features/landing/views/PopupMenu';
import IconDiscord from 'features/landing/views/NavSocialImage/IconDiscord';
import IconTwitter from 'features/landing/views/NavSocialImage/IconTwitter';
import IconLinkedIn from 'features/landing/views/NavSocialImage/IconLinkedIn';
import IconTelegram from 'features/landing/views/NavSocialImage/IconTelegram';
import IconMail from 'features/landing/views/NavSocialImage/IconMail';

const GoogleAnalytics = () => {
  return (
    <>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-HFY1S4EYJS"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-HFY1S4EYJS');
        `,
        }}
      />
    </>
  );
};

const HomePage: FC = () => {
  const [sectionHeight, setSectionHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : null,
  );
  const container1 = useRef<HTMLDivElement>(null);
  const container2 = useRef<HTMLDivElement>(null);
  const container2_2 = useRef<HTMLDivElement>(null);
  const container3 = useRef<HTMLDivElement>(null);
  const container4 = useRef<HTMLDivElement>(null);
  const getContainers = () => [
    container1.current,
    container2.current,
    container3.current,
    container4.current,
  ];
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
  const section1ContentRef = useRef<HTMLDivElement>(null);
  const section2ContentRef = useRef<HTMLDivElement>(null);
  const section3ContentRef = useRef<HTMLDivElement>(null);
  const section4ContentRef = useRef<HTMLDivElement>(null);
  const getSectionContents = () => [
    section1ContentRef.current,
    section2ContentRef.current,
    section3ContentRef.current,
    section4ContentRef.current,
  ];
  const joinWaitListBtnRef = useRef(null);
  const joinCommunityBtnRef = useRef(null);
  const progressBarElementRef = useRef(null);
  const [isBgOverlayDark, setIsBgOverlayDark] = useState(false);
  const [windowHeight, setWindowHeight] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(typeof window !== 'undefined' && window.innerWidth <= 768);
    setTimeout(() => {
      setWindowHeight(typeof window !== 'undefined' ? window.innerHeight : 800);
    }, 0);
  }, []);

  useEffect(() => {
    document.body.style.scrollBehavior = 'smooth';

    setTimeout(() => {
      const height = (window.innerHeight - 1) * 3;
      setSectionHeight(height);
    }, 0);
  }, []);

  const initAnimation = ({
    animationData,
    container,
    autoplay,
    renderer = 'svg',
  }) => {
    const isDesktop = window.innerWidth > 768;
    return lottie.loadAnimation({
      container,
      renderer:
        (new URLSearchParams(window.location.search).get(
          'renderer',
        ) as 'svg') ||
        renderer ||
        'svg',
      loop: false,
      autoplay,
      animationData,
      rendererSettings: {
        preserveAspectRatio: isDesktop ? 'xMaxYMax slice' : 'xMaxYMid slice',
      },
    });
  };

  function getScrollPosition() {
    return window.scrollY;
  }

  function getScrollObject() {
    return document;
  }

  function getCurrentSection() {
    if (typeof window === 'undefined') {
      return 0;
    }

    for (const [index, section] of getSections().entries() as any) {
      const scrollPosition = getScrollPosition();
      if (scrollPosition <= 2) {
        return 0;
      }
      if (scrollPosition < section?.clientHeight + section?.offsetTop) {
        if (index === 4) {
          return 4;
        }
        return index + 1;
      }
    }

    return 5;
  }

  function getSectionScrollPercent(sectionIndex = getCurrentSection()) {
    const section = getSections()[sectionIndex];
    const offsetTop = section?.offsetTop;
    const height = section?.clientHeight;
    if (section) {
      const scrollPosition = window.scrollY;
      return ((scrollPosition - offsetTop) * 100) / height;
    }

    return 0;
  }

  const playAnimation = (animationIndex: number) => {
    if (animationIndex === 0) {
      return;
    }
    const animation = animations.current[animationIndex];
    const section = getSections()[animationIndex - 1];
    const offsetTop = section?.offsetTop;
    const height = section?.clientHeight;

    if (section && animation) {
      const scrollPosition = getScrollPosition();
      const scrollPercent = ((scrollPosition - offsetTop) * 100) / height;

      const maxFrames = animation.totalFrames;
      let frame = (maxFrames * scrollPercent) / 100;

      if (frame > maxFrames) {
        frame = maxFrames;
      }

      animation.goToAndStop(frame, true);
    }
  };

  function initAnimations() {
    const isMobile = window.innerWidth < 768;
    import(`features/landing/animations/${isMobile ? 'BM1.json' : 'B1.json'}`).then(
      (module) => {
        const anim1 = module.default;
        animations.current[0] = initAnimation({
          animationData: anim1,
          container: document.getElementById('animationContainer1'),
          autoplay: true,
          renderer: 'svg',
        });
      },
    );

    import(`features/landing/animations/${isMobile ? 'BM2_1.json' : 'B2_1.json'}`)
      .then((module) => {
        const anim2 = module.default;
        animations.current[1] = initAnimation({
          animationData: anim2,
          container: document.getElementById('animationContainer2'),
          autoplay: false,
          renderer: 'svg',
        });
      })
      .then(
        () => import(`features/landing/animations/${isMobile ? 'BM2_2.json' : 'B2_2.json'}`),
      )
      .then((module) => {
        const anim3 = module.default;
        animations.current[4] = initAnimation({
          animationData: anim3,
          container: document.getElementById('animationContainer2_2'),
          autoplay: false,
        });
      })
      .then(() => import(`features/landing/animations/${isMobile ? 'BM3.json' : 'B3.json'}`))
      .then((module) => {
        const anim3 = module.default;
        animations.current[2] = initAnimation({
          animationData: anim3,
          container: document.getElementById('animationContainer3'),
          autoplay: false,
        });
      })
      .then(() => import(`features/landing/animations/${isMobile ? 'BM4.json' : 'B4.json'}`))
      .then((module) => {
        const anim4 = module.default;
        animations.current[3] = initAnimation({
          animationData: anim4,
          container: document.getElementById('animationContainer4'),
          autoplay: false,
        });
      });
  }

  useEffect(() => {
    initAnimations(true);

    function play() {
      const currentSection = getCurrentSection();
      const scrollPercent = getSectionScrollPercent(currentSection - 1);
      const progressBarFiller = document.getElementById(
        'progress-bar-filler',
      );
      const percent = scrollPercent / 3 + (currentSection - 1) * 33.333;
      progressBarFiller.style.width = percent + '%';
      progressBarElementRef.current.style.display =
        percent >= 100 ? 'none' : 'block';

      playAnimation(currentSection);
      updateContainerStyles();
      updateSectionContentStyles();
      window.requestAnimationFrame(play);
    }

    window.requestAnimationFrame(play);

    let prevWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
    window.addEventListener('resize', (event) => {
      if (event.target.innerWidth !== prevWidth) {
        lottie.destroy();
        initAnimations();
        prevWidth = event.target.innerWidth;
        setIsMobile(typeof window !== 'undefined' && window.innerWidth <= 1024);
        setWindowHeight(typeof window !== 'undefined' ? window.innerHeight : 800);
      }
    });

    getScrollObject().addEventListener('scroll', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const currentSection = getCurrentSection();

      if (currentSection >= 5) {
        setIsBgOverlayDark(() => true);
        joinWaitListBtnRef.current.style.display = 'none';
        joinCommunityBtnRef.current.style.display = 'none';
      } else if (currentSection <= 4) {
        setIsBgOverlayDark(() => false);
        joinWaitListBtnRef.current.style.display = 'block';
        joinCommunityBtnRef.current.style.display = 'block';
      }

      if (window.scrollY > 500) {
        joinWaitListBtnRef.current.classList.add(s.btnJoinWaitlistNext);
      } else {
        joinWaitListBtnRef.current.classList.remove(s.btnJoinWaitlistNext);
      }

      if (window.scrollY > 5) {
        progressBarElementRef.current.classList.add(s.progressBarActive);
      } else {
        progressBarElementRef.current.classList.remove(s.progressBarActive);
      }

      updateOverlayStyles();
    });

    updateContainerStyles();
  }, []);

  function updateOverlayStyles() {
    const overlay = document.getElementById('bg-overlay');
    const section = getSections()[2];
    const scrollPosition = document.getElementById('main').scrollTop;
    const scrollPercent =
      ((scrollPosition - section?.offsetTop) * 100) / section?.clientHeight;
    overlay.style.transition = 'none';
    if (scrollPercent > 0) {
      overlay.style.backgroundColor = `rgba(27, 27, 27, ${scrollPercent / 100}`;
      container3.current.style.opacity = 1 - scrollPercent / 100;
    } else {
      overlay.style.backgroundColor = 'rgba(27, 27, 27, 0)';
      container3.current.style.opacity = 1;
    }
  }

  function updateContainerStyles() {
    const currentSection = getCurrentSection();

    if (container1.current) {
      container1.current.style.display =
        currentSection === 0 ? 'block' : 'none';
      container2.current.style.display =
        currentSection === 1 ? 'block' : 'none';
      container2_2.current.style.display =
        currentSection === 1 && window.scrollY < window.innerHeight / 1.7
          ? 'block'
          : 'none';
      container2_2.current.style.transform = `translateY(${
        currentSection === 1 ? 1 - window.scrollY * 1.8 : 0
      }px`;
      container3.current.style.display =
        currentSection === 2 ? 'block' : 'none';
      container4.current.style.display = currentSection >= 3 ? 'block' : 'none';

      if (currentSection === 4) {
        container4.current.classList.add(s.containerAnimationDisappeared);
      } else {
        container4.current.classList.remove(s.containerAnimationDisappeared);
      }
    }
  }

  function updateSectionContentStyles() {
    const currentSection = getCurrentSection() - 1;

    getSectionContents().forEach((sectionContent, index) => {
      if (index === currentSection) {
        if ((index === 0 && window.scrollY > 300) || index !== 0) {
          sectionContent?.classList.add(s.activeContent);
          sectionContent?.classList.remove(s.viewedContent);
        } else {
          sectionContent?.classList.remove(s.activeContent);
        }
      } else if (index < currentSection) {
        sectionContent?.classList.remove(s.activeContent);
        sectionContent?.classList.add(s.viewedContent);
      } else {
        sectionContent?.classList.remove(s.activeContent);
        sectionContent?.classList.remove(s.viewedContent);
      }
    });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const [name, email] = event.target || [];

    if (!name?.value || !email?.value) {
      alert('Please fill the form before submission');

      return;
    }

    const data = {
      submittedAt: Date.now(),
      fields: [
        {
          objectTypeId: '0-1',
          name: 'email',
          value: email.value,
        },
        {
          objectTypeId: '0-1',
          name: 'firstname',
          value: name.value,
        },
      ],
      context: {
        hutk: getCookie('hubspotutk'),
        pageUri: window.location.origin,
        pageName: 'Binaryx Landing Page',
      },
      legalConsentOptions: {
        // Include this object when GDPR options are enabled
        consent: {
          consentToProcess: true,
          text: 'I agree to allow Binaryx LTD to store and process my personal data.',
          communications: [
            {
              value: true,
              subscriptionTypeId: 999,
              text: 'I agree to receive marketing communications from Binaryx LTD.',
            },
          ],
        },
      },
    };

    fetch(
      'https://api.hsforms.com/submissions/v3/integration/submit/22710849/33113d53-079c-4c14-ab02-84409352b055',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )
      .then(() => {
        alert('Thanks for submitting! We will get back to you soon');
      })
      .catch((error) => {
        alert(error);
      });
  }

  const [isShowing, setIsShowing] = useState(false);

  const handleJoinWaitListButtonClick = () => setIsShowing(!isShowing);

  return (
    <div className={s.homePage}>
      <Navigation isDark={isBgOverlayDark} />
      <BgOverlay
        id="bg-overlay"
        isBgOverlayActive={true}
        isBgAnimationActive={true}
      />
      <div className={s.progressBar} ref={progressBarElementRef}>
        <span id="progress-bar-filler" className={s.progressBarFiller} />
        <ul className={s.progressBarItems}>
          <li className={s.progressBarItem} />
          <li className={s.progressBarItem} />
          <li className={s.progressBarItem} />
        </ul>
      </div>
      <div
        className={s.containerAnimation}
        ref={container1}
        id="animationContainer1"
      />
      <div
        className={s.containerAnimation}
        ref={container2_2}
        id="animationContainer2_2"
      />
      <div
        className={s.containerAnimation}
        ref={container2}
        id="animationContainer2"
      />
      <div
        className={s.containerAnimation}
        ref={container3}
        id="animationContainer3"
      />
      <div
        className={classNames(s.containerAnimation, s.containerAnimation4, {
          [s.containerAnimationDisappeared]: false,
        })}
        ref={container4}
        id="animationContainer4"
      />
      <PopupMenu
        isShowing={isShowing}
        setIsShowing={setIsShowing}
        handleFormSubmit={handleFormSubmit}
      />
      <main
        id="main"
        className={classNames(s.heroPage, s.heroPageParallax)}
      >
        <div
          id="section1"
          ref={section1Ref}
          className={classNames(s.wrapper, 'section', s.section, s.section1)}
          style={{ height: sectionHeight }}
        >
          <section className={s.heroPageInfo} style={{ height: windowHeight }}>
            <div className={s.sectionContent} style={{ height: windowHeight }}>
              <h1 className={s.companyTitle}>
                <span>
                  <b style={{ color: 'var(--font-color_blue-light)' }}>
                    Binaryx
                  </b>
                </span>
                <span className={s.companySubTitle}>Community-Powered</span>
                <span className={s.companySubTitle}>
                  Real Estate Tokenization Protocol
                </span>
              </h1>
              <p className={s.hint}>{/* Technology based */}</p>
              <div className={s.infoSection}>
                <button
                  onClick={handleJoinWaitListButtonClick}
                  className={s.btnJoinWaitlist}
                  ref={joinWaitListBtnRef}
                >
                  Join waitlist
                </button>
                <button
                  type="submit"
                  ref={joinCommunityBtnRef}
                  className={s.joinCommunity}
                  onClick={handleJoinWaitListButtonClick}
                >
                  Join our community
                </button>
              </div>
            </div>
          </section>
          <SectionElement
            heading="Expensive asset value already in past"
            description={
              <>
                With Binaryx Protocol you will be able to buy a real tokenized
                estate with only 50$ till unlimited.
                <br />
                Buy, trade and sell your property fast, secure, and profitable
                at anytime
              </>
            }
            sectionHeight={sectionHeight}
            windowHeight={windowHeight}
            onButtonClick={handleJoinWaitListButtonClick}
            contentElementRef={section1ContentRef}
            isSticky={!isMobile}
          />
        </div>
        <div
          id="section2"
          ref={section2Ref}
          className={classNames(s.wrapper, s.section, 'section')}
        >
          <SectionElement
            heading="The next generation DeFi experience with Real Yield"
            description="Use your property tokens to borrow and keep earning the highest yield available at the same time"
            onButtonClick={handleJoinWaitListButtonClick}
            sectionHeight={sectionHeight / 2}
            windowHeight={windowHeight}
            contentElementRef={section2ContentRef}
          />
        </div>
        <div
          id="section3"
          ref={section3Ref}
          className={classNames(s.wrapper, s.section, s.section3, 'section')}
        >
          <SectionElement
            heading="Boosting Economy and scaling Web3"
            description="Increasing assets ownership transferring speed with web3 infrastructure"
            sectionHeight={sectionHeight / 2}
            windowHeight={windowHeight}
            contentElementRef={section3ContentRef}
            onButtonClick={handleJoinWaitListButtonClick}
            disappeared={isBgOverlayDark}
          />
        </div>
        <div ref={section4Ref} className={s.sectionPadding} />
        <div className={s.sectionsDark}>
          <BgOverlay
            isBgOverlayActive={true}
            isBgAnimationActive={true}
            isBgOverlayAbsolute={true}
            height={windowHeight}
            className={s.bgOverlaySchema}
          />
          <BgOverlay
            isBgOverlayActive={true}
            isBgAnimationActive={true}
            isBgOverlayAbsolute={true}
            height={windowHeight}
            paddingTop={windowHeight}
          />
          <BgOverlay
            isBgOverlayActive={true}
            isBgAnimationActive={true}
            isBgOverlayAbsolute={true}
            height={windowHeight}
            paddingTop={windowHeight * 2}
          />
          <SchemaSection className={classNames(s.section, 'section')} />
          <TimelineSection
            className={classNames(s.section, 'section')}
            minHeight={windowHeight}
          />
          <section
            id="sectionTeam"
            className={classNames(s.section, s.ourTeam, 'section')}
            style={{ minHeight: windowHeight }}
          >
            <div className={s.ourTeamContainer}>
              <h1 className={s.ourTeamTitle}>Our Team</h1>
              <div className={classNames(s.teamGallery, s.wrapper)}>
                <TeamBlock
                  imgSrc={
                    'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/team/oleg_kurchenko.png'
                  }
                  personName={'Oleg Kurchenko'}
                  personPosition={'Chief Executive Officer'}
                  socialLinkImage={
                    'https://cdn-icons-png.flaticon.com/512/61/61109.png'
                  }
                  socialLink={'https://www.linkedin.com/in/oleg-kurchenko'}
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
                  socialLink={'https://www.linkedin.com/in/dmitriy-green'}
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
                  socialLink={'https://www.linkedin.com/in/dlizanets'}
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
                  socialLink={
                    'https://www.linkedin.com/in/andrii-makaveli-b25259150/'
                  }
                  socialUserName={'andriy_makaveli'}
                />
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
                  <form
                    id="waitlist-form"
                    className={s.formSection}
                    onSubmit={handleFormSubmit}
                  >
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
                      <input type="checkbox" defaultChecked={true} />
                      <span>
                        Agree to the Privacy Policy and Terms of Service
                      </span>
                    </label>
                  </form>
                </div>
              </div>
              <footer className={s.footer}>
                <div className={classNames(s.footerContainer, s.wrapper)}>
                  <h1 className={s.footerHeading}>Let's Keep in Touch With:</h1>
                  <nav className={s.footerNavSocial}>
                    <NavSocialImage
                      link={'https://discord.gg/f4mTchBKC8'}
                      icon={
                        <IconDiscord
                          className={s.footerNavSocialImage}
                          width={isMobile ? 36 : 55}
                          height={isMobile ? 26 : 40}
                          fill="#335367"
                        />
                      }
                    />
                    <NavSocialImage
                      link={'https://twitter.com/BinaryxProtocol'}
                      icon={
                        <IconTwitter
                          className={s.footerNavSocialImage}
                          width={isMobile ? 34 : 45}
                          height={isMobile ? 25 : 41}
                          fill="#335367"
                        />
                      }
                    />
                    <NavSocialImage
                      link={'https://www.linkedin.com/company/binaryxprotocol/'}
                      icon={
                        <IconLinkedIn
                          className={s.footerNavSocialImage}
                          width={isMobile ? 32 : 45}
                          height={isMobile ? 29 : 44}
                          fill="#335367"
                        />
                      }
                    />
                    <NavSocialImage
                      link={'https://t.me/binaryxnews'}
                      icon={
                        <IconTelegram
                          className={s.footerNavSocialImage}
                          width={isMobile ? 30 : 43}
                          height={isMobile ? 30 : 43}
                          fill="#335367"
                        />
                      }
                    />
                    <NavSocialImage
                      link={'mailto:hello@binaryx.com'}
                      style={{ margin: isMobile ? "-3px 0 0 -3px" : "-4px 0 0 -4px" }}
                      newWindow={false}
                      icon={
                        <IconMail
                          className={s.footerNavSocialImage}
                          width={isMobile ? 36 : 52}
                          height={isMobile ? 36 : 52}
                          fill="#335367"
                        />
                      }
                    />
                  </nav>
                </div>
                <hr className={s.footerDivider} />
                <nav className={s.footerBottomSection}>
                  <div
                    className={classNames(
                      s.footerBottomSectionContainer,
                      s.wrapper,
                    )}
                  >
                    <img
                      src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/common/logo_black_horizontal.svg"
                      alt="company_logo"
                      width={180}
                      onClick={() => (window as Window).scrollTo(0, 0)}
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
              </footer>
            </div>
          </section>
        </div>
        <GoogleAnalytics />
      </main>
    </div>
  );
};

export default HomePage;
