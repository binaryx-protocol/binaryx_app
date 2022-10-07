import Navigation from './components/HomeNavigation';
import { FC, useEffect, useRef, useState } from 'react';
import SectionElement from './components/SectionElement';
import s from './styles.module.scss';
import TeamBlock from './components/TeamBlock';
import NavSocialImage from './components/NavSocialImage';
import MenuElement from 'components/pages/account_page/AccountMenu/MenuElement';
import lottie from 'lottie-web';
import anim1 from './animations/B1.json';
import anim2 from './animations/B2.json';
import anim3 from './animations/B3.json';
import anim4 from './animations/B4.json';
import classNames from 'classnames';
import getCookie from 'utils/getCookie';
import SchemaSection from './components/WebAssetSection/SchemaSection';
import TimelineSection from './components/TimelineSection';
import PopupMenu from './components/PopupMenu';

const HomePage: FC = () => {
  const [sectionHeight, setSectionHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : null,
  );
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
  const [bgOverlay, setBgOverlay] = useState({
    isBgOverlayActive: false,
    isBgAnimationActive: false,
    isBgOverlayDark: false,
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
    document.body.parentElement.style.overflow = 'hidden';
    document.body.parentElement.style.height = '100%';

    setTimeout(() => {
      setSectionHeight(window.innerHeight - 1);

      setTimeout(() => {
        import('fullpage.js').then((module) => {
          const fullpage = module.default;

          (window as any).fullpageObject = new fullpage('#main', {
            //options here
            autoScrolling: true,
            scrollHorizontally: true,
            scrollingSpeed: 1500,
            fitToSectionDelay: 0,
            css3: false,
            lazyLoading: false,
            fitToSection: false,
            // anchors: [],
            // normalScrollElements: "#sectionWaitlist, #sectionTeam",
            onLeave: (origin, destination, direction) => {
              const nextSection = destination.index;
              updateContainerStylesV2(nextSection);
              currentSectionRef.current = nextSection;
              const animation = animations.current[nextSection];
              const nextValue =
                [1, 2, 3].includes(nextSection) && direction === 'up'
                  ? 1100
                  : 0;
              animation?.goToAndPlay(nextValue);
              console.log('nextSection', nextSection);

              // setIsBgOverlayActive(() => nextSection !== 0);
              // setIsBgAnimationActive(() => nextSection !== 4);
              // setIsBgOverlayDark(() => nextSection >= 4);

              setBgOverlay({
                isBgOverlayActive: nextSection !== 0,
                isBgAnimationActive: true,
                isBgOverlayDark: nextSection >= 4,
              });
            },
            afterLoad: () => {
              document.querySelector('.fp-watermark')?.remove();

              setSectionHeight(window.innerHeight);
            },
          });
        });
      }, 0);
    }, 0);
  }, []);

  const initAnimation = ({ animationData, container, autoplay }) => {
    const isDesktop = window.innerWidth > 768;
    return lottie.loadAnimation({
      container,
      renderer: 'canvas',
      loop: false,
      autoplay,
      animationData,
      rendererSettings: {
        // preserveAspectRatio: 'xMidYMid meet',
        preserveAspectRatio: isDesktop ? 'xMaxYMax meet' : 'xMaxYMid slice',
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
    const offsetTop = section?.offsetTop;
    const height = section?.clientHeight;

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

  function initAnimations() {
    animations.current[0] = initAnimation({
      animationData: anim1,
      container: document.getElementById('animationContainer0'),
      autoplay: true,
    });

    animations.current[1] = initAnimation({
      animationData: anim2,
      container: document.getElementById('animationContainer1'),
      autoplay: false,
    });
    animations.current[2] = initAnimation({
      animationData: anim3,
      container: document.getElementById('animationContainer2'),
      autoplay: false,
    });
    animations.current[3] = initAnimation({
      animationData: anim4,
      container: document.getElementById('animationContainer3'),
      autoplay: false,
    });
  }

  useEffect(() => {
    initAnimations();

    document.addEventListener('scroll', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const currentSection = getCurrentSection();
      if (currentSection <= 1) {
        return;
      }
      updateContainerStyles();

      playAnimation(currentSection);
    });

    updateContainerStyles();
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
    <>
      <Navigation isDark={bgOverlay.isBgOverlayDark} />
      <div
        className={classNames(s.bgOverlay, {
          [s.bgOverlayActive]: bgOverlay.isBgOverlayActive,
          [s.bgOverlayDark]: bgOverlay.isBgOverlayDark,
        })}
      >
        <div
          className={classNames(s.bgOverlayItem, s.bgOverlayItem1, {
            [s.bgOverlayItemActive]: bgOverlay.isBgAnimationActive,
          })}
        />
        <div
          className={classNames(s.bgOverlayItem, s.bgOverlayItem2, {
            [s.bgOverlayItemActive]: bgOverlay.isBgAnimationActive,
          })}
        />
        <div
          className={classNames(s.bgOverlayItem, s.bgOverlayItem3, {
            [s.bgOverlayItemActive]: bgOverlay.isBgAnimationActive,
          })}
        />
      </div>
      <div
        className={s.containerAnimation}
        ref={container0}
        id="animationContainer0"
      />
      <div
        className={s.containerAnimation}
        ref={container1}
        id="animationContainer1"
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

      <PopupMenu
        isShowing={isShowing}
        setIsShowing={setIsShowing}
        handleFormSubmit={handleFormSubmit}
      />
      <main id="main" className={s.heroPage}>
        <div
          id="section1"
          ref={section1Ref}
          className={classNames(s.wrapper, 'section', s.section, s.section1)}
        >
          <section className={s.heroPageInfo} style={{ height: sectionHeight }}>
            <h1 className={s.companyTitle}>
              <span>
                <b style={{ color: 'var(--font-color_blue-light)' }}>Binaryx</b>
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
              >
                Join waitlist
              </button>
              <button type="submit" className={s.joinCommunity}>
                Join our community
              </button>
            </div>
          </section>
        </div>
        <div
          id="section2"
          ref={section2Ref}
          className={classNames(s.wrapper, s.section, 'section')}
        >
          <SectionElement
            heading="Expensive asset value already in past"
            preTitle="WE ARE HERE TO:"
            body="With Binaryx Protocol you will be able to buy a real tokenized estate with only 50$ till unlimited. 
            Buy, trade and sell your property fast, secure, and profitable at anytime"
            onButtonClick={handleJoinWaitListButtonClick}
          />
        </div>
        <div
          id="section3"
          ref={section3Ref}
          className={classNames(s.wrapper, s.section, 'section')}
        >
          <SectionElement
            heading="The next generation DeFi experience with Real Yield"
            preTitle="WE ARE HERE TO:"
            body="Use your property tokens to borrow and keep earning the highest yield available at the same time"
            onButtonClick={handleJoinWaitListButtonClick}
          />
        </div>
        <div
          id="section4"
          ref={section4Ref}
          className={classNames(s.wrapper, s.section, 'section')}
        >
          <SectionElement
            heading="Boosting Economy and scaling Web3"
            preTitle="WE ARE HERE TO:"
            body="Increasing assets ownership transferring speed with web3 infrastracture "
            onButtonClick={handleJoinWaitListButtonClick}
          />
        </div>
        <SchemaSection className={classNames(s.section, 'section')} />
        <TimelineSection className={classNames(s.section, 'section')} />
        <section
          id="sectionTeam"
          className={classNames(s.section, s.ourTeam, 'section')}
        >
          <div
            className={s.ourTeamContainer}
            style={{ minHeight: sectionHeight }}
          >
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
            {/* </section> */}
            {/*<section className={classNames(s.section, s.footerSection, "section")}>*/}
            <footer className={s.footer}>
              <div className={classNames(s.footerContainer, s.wrapper)}>
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
                    src={
                      'https://cdn-icons-png.flaticon.com/512/733/733635.png'
                    }
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
                    onClick={() => (window as any).fullpageObject.moveTo(0)}
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
      </main>
    </>
  );
};

export default HomePage;
