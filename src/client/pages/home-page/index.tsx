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
import DescriptionBlock from './components/DescriptionBlock';
import getCookie from 'utils/getCookie';
import SchemaDesktop from './components/WebAssetSection/SchemaDesktop';

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
  const [isBgAnimationActive, setIsBgAnimationActive] = useState(false);
  const [isBgOverlayDark, setIsBgOverlayDark] = useState(false);

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
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
    document.body.parentElement.style.overflow = 'hidden';
    document.body.parentElement.style.height = '100%';

    initAnimations();

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
    // setTimeout(() => {
    import('fullpage.js').then((module) => {
      const fullpage = module.default;

      (window as any).fullpageObject = new fullpage('#main', {
        //options here
        autoScrolling: true,
        scrollHorizontally: true,
        scrollingSpeed: 1500,
        fitToSectionDelay: 0,
        css3: true,
        fitToSection: false,
        // anchors: [],
        // normalScrollElements: "#sectionWaitlist, #sectionTeam",
        onLeave: (origin, destination, direction) => {
          const nextSection = destination.index;
          updateContainerStylesV2(nextSection);
          currentSectionRef.current = nextSection;
          const animation = animations.current[nextSection];
          const nextValue =
            [1, 2, 3].includes(nextSection) && direction === 'up' ? 1100 : 0;
          animation?.goToAndPlay(nextValue);
          console.log('nextSection', nextSection);
          setIsBgOverlayActive(() => nextSection !== 0);
          setIsBgAnimationActive(() => nextSection !== 4);
          setIsBgOverlayDark(() => nextSection >= 4);
        },
        afterLoad: () => {
          document.querySelector('.fp-watermark')?.remove();
        },
      });
    });
    // }, 1000);
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

    // let xhr = new XMLHttpRequest();
    // let url =
    //   'https://api.hsforms.com/submissions/v3/integration/submit/22710849/33113d53-079c-4c14-ab02-84409352b055';

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

    // let final_data = JSON.stringify(data);
    //
    // xhr.open('POST', url);
    // xhr.setRequestHeader('Content-Type', 'application/json');
    //
    // xhr.onreadystatechange = function () {
    //   if (xhr.status !== 200) {
    //
    //   }
    // };
    //
    // xhr.send(final_data);

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

  function handleJoinWaitListButtonClick() {
    (window as any).fullpageObject.moveTo(
      document.querySelectorAll('.section').length,
    );
  }

  useEffect(() => {
    const webAssets = document.querySelectorAll('.styles_isShow__g-Dv6');

    const observer = new IntersectionObserver((entries) =>
      entries.forEach((entry) => {
        setTimeout(() => {
          entry.target.classList.toggle(
            'styles_isShow__g-Dv6',
            entry.isIntersecting,
          );
        }, 600);
        if (entry.isIntersecting) observer.unobserve(entry.target);
      }),
    );

    webAssets.forEach((elem) => observer.observe(elem));
  }, []);

  return (
    <>
      <Navigation isDark={isBgOverlayDark} />
      <div
        className={classNames(s.bgOverlay, {
          [s.bgOverlayActive]: isBgOverlayActive,
          [s.bgOverlayDark]: isBgOverlayDark,
        })}
      >
        <div
          className={classNames(s.bgOverlayItem, s.bgOverlayItem1, {
            [s.bgOverlayItemActive]: isBgAnimationActive,
          })}
        />
        <div
          className={classNames(s.bgOverlayItem, s.bgOverlayItem2, {
            [s.bgOverlayItemActive]: isBgAnimationActive,
          })}
        />
        <div
          className={classNames(s.bgOverlayItem, s.bgOverlayItem3, {
            [s.bgOverlayItemActive]: isBgAnimationActive,
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
      <main id="main" className={s.heroPage}>
        <div
          id="section1"
          ref={section1Ref}
          className={classNames(s.wrapper, 'section', s.section)}
        >
          <section className={s.heroPageInfo}>
            <h1 className={s.companyTitle}>
              <span>
                <b style={{ color: 'rgba(0, 180, 204, 1)' }}>Binaryx</b>
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
        <SchemaDesktop
          id="sectionWebAssets"
          className={classNames(s.section, 'section')}
        />
        <section
          className={classNames(s.timeline, s.section, s.wrapper, 'section')}
        >
          <div className={s.timelineGrid}>
            <div className={s.timelineSeparatorTr} />
            <ul className={s.timelineSeparatorLine}>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <div className={s.timelineHeaders}>
              <h1 className={s.timelineTitle}>Timeline</h1>
              <h3>Product</h3>
              <h3>Marketing</h3>
              {/*<h3>Organization</h3>*/}
            </div>
            <div className={s.timelineColumn}>
              <DescriptionBlock year={'2022'}>
                <li>MVP Building</li>
              </DescriptionBlock>
              <DescriptionBlock>
                <li>– Socials launch</li>
                <li>– First 750 members onboarded</li>
              </DescriptionBlock>
              {/*<DescriptionBlock>*/}
              {/*  <li>Legal set up</li>*/}
              {/*</DescriptionBlock>*/}
            </div>
            <div className={s.timelineColumn}>
              <DescriptionBlock year={'Q1 2023'}>
                <li>Binaryx marketplace pre-launch on Testnet v1, v2</li>
              </DescriptionBlock>
              <DescriptionBlock>
                <li>&gt; 5k members onboarded</li>
                <li>&gt; 2k KYC done</li>
              </DescriptionBlock>
              {/*<DescriptionBlock>*/}
              {/*  <li>Seed round</li>*/}
              {/*</DescriptionBlock>*/}
            </div>
            <div className={s.timelineColumn}>
              <DescriptionBlock year={'Q2 2023'}>
                <li>Testnet v3 launch</li>
              </DescriptionBlock>
              <DescriptionBlock>
                <li>– Academy launch</li>
                <li>– Ambassador program launch</li>
              </DescriptionBlock>
              {/*<DescriptionBlock>*/}
              {/*  <li>IDO</li>*/}
              {/*</DescriptionBlock>*/}
            </div>
            <div className={s.timelineColumn}>
              <DescriptionBlock year={'Q3 2023'}>
                <li>Binaryx marketplace official launch</li>
              </DescriptionBlock>
              <DescriptionBlock>
                <li>– Airdrop for the first academy graduates</li>
                <li>– Staking program</li>
                <li>&gt; 70k members onboarded</li>
                <li>&gt; 7k $aBNRX holders</li>
              </DescriptionBlock>
              {/*<DescriptionBlock>*/}
              {/*  <li>– Token launch</li>*/}
              {/*  <li>– DAO launch</li>*/}
              {/*</DescriptionBlock>*/}
            </div>
            <div className={s.timelineColumn}>
              <DescriptionBlock year="Q4 2023">
                <li>1 st Smart contact audit</li>
              </DescriptionBlock>
              <DescriptionBlock>
                <li>Referral program launch</li>
                <li>200k members onboarded</li>
                <li>&gt; 20k $aBNRX holders</li>
              </DescriptionBlock>
            </div>
            <div className={s.timelineColumn}>
              <DescriptionBlock year="2024">
                <li>Other DeFi services launch The secondary market</li>
              </DescriptionBlock>
              <DescriptionBlock>
                <li>&gt; 100k $aBRX holders</li>
              </DescriptionBlock>
            </div>
          </div>
        </section>
        <section
          id="sectionTeam"
          className={classNames(s.section, s.ourTeam, 'section')}
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
            {/* <BackgroundVisuals top={'10%'} /> */}
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
