import Navigation from './components/HomeNavigation';
import { FC, useEffect, useRef, useState } from 'react';
import SectionElement from './components/SectionElement';
import s from './styles.module.scss';
import TeamBlock from './components/TeamBlock';
import NavSocialImage from './components/NavSocialImage';
import MenuElement from 'components/pages/account_page/AccountMenu/MenuElement';
import lottie from 'lottie-web';
import anim1 from './animations/B1.json';
import classNames from 'classnames';
import DescriptionBlock from './components/DescriptionBlock';
import getCookie from 'utils/getCookie';

const HomePage: FC = () => {
  const [sectionHeight, setSectionHeight] = useState(typeof window !== "undefined" ? window.innerHeight : null);
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
  const [bgOverlay, setBgOverlay] = useState({ isBgOverlayActive: true, isBgAnimationActive: true, isBgOverlayDark: false })

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
            autoScrolling: false,
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
                [1, 2, 3].includes(nextSection) && direction === 'up' ? 1100 : 0;
              animation?.goToAndPlay(nextValue);
              console.log('nextSection', nextSection);
              console.log('nextAnimation', animation);

              // setIsBgOverlayActive(() => nextSection !== 0);
              // setIsBgAnimationActive(() => nextSection !== 4);
              // setIsBgOverlayDark(() => nextSection >= 4);

              setBgOverlay({
                isBgOverlayActive: nextSection !== 0,
                isBgAnimationActive: true,
                isBgOverlayDark: nextSection >= 4
              });
            },
            afterLoad: () => {
              const main = document.getElementById("main");
              main.style.height = "100vh";
              main.style.overflow = "scroll";

              document.querySelector('.fp-watermark')?.remove();

              setSectionHeight(window.innerHeight);
            },
          });
        });
      }, 0);
    }, 0);
  }, [])

  const initAnimation = ({ animationData, container, autoplay }) => {
    const isDesktop = window.innerWidth > 768;
    return lottie.loadAnimation({
      container,
      renderer: new URLSearchParams(window.location.search).get("renderer") as 'svg' || 'svg',
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

    const main = document.getElementById("main");

    for (const [index, section] of getSections().entries() as any) {
      const scrollPosition = main.scrollTop;
      if (scrollPosition <= 5) {
        return 0;
      }
      if (scrollPosition < section.clientHeight + section?.offsetTop) {
        if (index === 3) {
          return 3;
        }
        return index + 1;
      }
    }

    return 4;

    // if (window.scrollY <= 5) {
    //   return 0;
    // }

    // let result =

    // for (const [index, section] of getSections().entries() as any) {
    //   const scrollPosition = window.scrollY - (section?.offsetTop - 95);
    //   if (scrollPosition > 0 && scrollPosition < section.clientHeight) {
    //     if (index === 3) {
    //       return 3;
    //     }
    //     return index + 1;
    //   }
    // }

    // return 3;
  };

  function getCurrentSectionV2() {
    return currentSectionRef.current;
  }

  const playAnimation = (animationIndex: number) => {
    if (animationIndex === 0) {
      return;
    }

    const animation = animations.current[animationIndex];
    const section = getSections()[animationIndex - 1];
    const offsetTop = section?.offsetTop;
    const height = section?.clientHeight;

    console.log('playanimation start ' + animationIndex, section, animation);

    if (section && animation) {
      // const scrollPosition = window.scrollY - (offsetTop);
      const scrollPosition = document.getElementById("main").scrollTop;
      const scrollPercent = ((scrollPosition - offsetTop) * 100) / height;

      const maxFrames = animation.totalFrames;
      let frame = (maxFrames * scrollPercent) / 100;

      if (frame > maxFrames) {
        frame = maxFrames;
      }

      animation.goToAndStop(frame, true);

      console.log(
        'playanimation ' + animationIndex + "\n",
        `frame: ${frame} \n`,
        `maxFrames: ${maxFrames}\n`,
        `scrollPosition: ${scrollPosition}\n`,
        `scrollPercent: ${scrollPercent}`
      );
    }
  };

  function initAnimations() {
    animations.current[0] = initAnimation({
      animationData: anim1,
      container: document.getElementById('animationContainer0'),
      autoplay: true,
    });
    console.log("anim1", anim1);
    import("./animations/B2.json")
      .then((module) => {
        const anim2 = module.default;
        console.log("anim2", anim2);
        animations.current[1] = initAnimation({
          animationData: anim2,
          container: document.getElementById('animationContainer1'),
          autoplay: false,
        });
      })
      .then(() => import("./animations/B3.json"))
      .then((module) => {
        const anim3 = module.default;
        animations.current[2] = initAnimation({
          animationData: anim3,
          container: document.getElementById('animationContainer2'),
          autoplay: false,
        });
      })
      .then(() => import("./animations/B4.json"))
      .then((module) => {
        const anim4 = module.default;
        animations.current[3] = initAnimation({
          animationData: anim4,
          container: document.getElementById('animationContainer3'),
          autoplay: false,
        });
      })

  }

  function changeWheelSpeed(container, speedY) {
    var scrollY = 0;

    var handleScrollReset = function() {
      scrollY = container.scrollTop;
    };
    var handleMouseWheel = function(e) {
      e.preventDefault();
      scrollY += speedY * e.deltaY
      if (scrollY < 0) {
        scrollY = 0;
      } else {
        var limitY = container.scrollHeight - container.clientHeight;
        if (scrollY > limitY) {
          scrollY = limitY;
        }
      }
      container.scrollTop = scrollY;

      const currentSection = getCurrentSection();
      const isBgOverlayDark = currentSection >= 4;
      // if (isBgOverlayDark !== bgOverlay.isBgOverlayDark) {
      //   setBgOverlay({
      //     isBgOverlayActive: true,
      //     isBgAnimationActive: true,
      //     isBgOverlayDark
      //   });
      console.log("scroll event", isBgOverlayDark);
      // }
    };

    container.addEventListener('mouseup', handleScrollReset, { passive: false });
    container.addEventListener('mousedown', handleScrollReset, { passive: false });
    container.addEventListener('mousewheel', handleMouseWheel, { passive: false });

    var removed = false;

    return function() {
      if (removed) {
        return;
      }

      container.removeEventListener('mouseup', handleScrollReset, { passive: false });
      container.removeEventListener('mousedown', handleScrollReset, { passive: false });
      container.removeEventListener('mousewheel', handleMouseWheel, { passive: false });

      removed = true;
    };
  }

  useEffect(() => {
    const main = document.getElementById("main");
    changeWheelSpeed(main, 0.1)
    initAnimations();

    main.addEventListener('scroll', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const currentSection = getCurrentSection();
      // if (currentSection <= 1) {
      //   return;
      // }
      updateContainerStyles();

      console.log("currentSection", currentSection);
      playAnimation(currentSection);
      updateOverlayStyles();
    });

    updateContainerStyles();
  }, []);

  function updateOverlayStyles() {
    const overlay = document.getElementById("bg-overlay");
    const section = getSections()[3];
    const scrollPosition = document.getElementById("main").scrollTop;
    const scrollPercent = ((scrollPosition - section.offsetTop) * 100) / section.clientHeight;
    overlay.style.transition = "none";
    if (scrollPercent > 0) {
      overlay.style.backgroundColor = `rgba(27, 27, 27, ${scrollPercent / 100}`;
      const animationOpacity = 1 - scrollPercent / 100;
      container3.current.style.opacity = animationOpacity
    } else {
      overlay.style.backgroundColor = "rgba(27, 27, 27, 0)";
      container3.current.style.opacity = 1;
    }
  }

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

  function handleJoinWaitListButtonClick() {
    (window as any).fullpageObject.moveTo(
      document.querySelectorAll('.section').length,
    );
  }

  return (
    <>
      <Navigation isDark={bgOverlay.isBgOverlayDark} />
      <div
        id="bg-overlay"
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
      <main id="main" className={s.heroPage} style={{ height: "100vh", overflow: "scroll" }}>
        <div
          id="section1"
          ref={section1Ref}
          className={classNames(s.wrapper, 'section', s.section, s.section1)}
        >
          <section className={s.heroPageInfo} style={{ height: sectionHeight }}>
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
            sectionHeight={sectionHeight}
            onButtonClick={handleJoinWaitListButtonClick}
          >
            <p className={s.description}>
              With Binaryx Protocol you will be able to buy a real tokenized estate with only 50$ till unlimited.
              <br />
              Buy, trade and sell your property fast, secure, and profitable at anytime
            </p>
          </SectionElement>
        </div>
        <div
          id="section3"
          ref={section3Ref}
          className={classNames(s.wrapper, s.section, 'section')}
        >
          <SectionElement
            heading="The next generation DeFi experience with Real Yield"
            onButtonClick={handleJoinWaitListButtonClick}
            sectionHeight={sectionHeight}
          >
            <p className={s.description}>
              Use your property tokens to borrow and keep earning the highest yield available at the same time
            </p>
          </SectionElement>
        </div>
        <div
          id="section4"
          ref={section4Ref}
          className={classNames(s.wrapper, s.section, 'section')}
        >
          <SectionElement
            heading="Boosting Economy and scaling Web3"
            sectionHeight={sectionHeight}
            onButtonClick={handleJoinWaitListButtonClick}
          >
            <p className={s.description}>
              Increasing assets ownership transferring speed with web3 infrastracture
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
          <div className={s.webAssetsContainer} style={{ minHeight: sectionHeight }}>
            <h1 className={classNames(s.assetsTitle)}>
              Welcome to the Era of Web3 assets
            </h1>
            {/*<BackgroundVisuals top={'50%'} />*/}
            <div className={s.webAssetBlock}>
              <img
                className={`${s.assetsWeb3Desktop}`}
                src={
                  'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/common/web3_section_temporary_desktop.svg'
                }
              />
              <img
                className={s.assetsWeb3Mobile}
                src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/common/web3_section_temporary_mobile4.png"
                style={{ maxHeight: sectionHeight - 250 }}
              />
              {/*<div className={s.assetsWeb3Mobile}>*/}
              {/*  <WebAssetBlock className={s.webAssetsLegend}>*/}
              {/*    <p>1. Property Tokenization</p>*/}
              {/*    <p>2. Purchasing Property Tokens</p>*/}
              {/*    <p>3. Claiming Rewards from Rent</p>*/}
              {/*  </WebAssetBlock>*/}
              {/*  <WebAssetBlock className={s.binaryxMarketplace}>*/}
              {/*    <WebAssetCard*/}
              {/*      imageSrc={''}*/}
              {/*      imageDescription={'Binaryx Marketplace'}*/}
              {/*    />*/}
              {/*  </WebAssetBlock>*/}
              {/*  <WebAssetBlock className={s.propertyTokenization}>*/}
              {/*    <WebAssetCard imageSrc={''} imageDescription={'Property'} />*/}
              {/*    <WebAssetCard*/}
              {/*      imageSrc={'#'}*/}
              {/*      imageDescription={'Property Tokens'}*/}
              {/*    />*/}
              {/*  </WebAssetBlock>*/}
              {/*  <WebAssetBlock className={s.purchasingPropertyTokens}>*/}
              {/*    <WebAssetCard*/}
              {/*      imageSrc={'#'}*/}
              {/*      imageDescription={'Property Taken'}*/}
              {/*    />*/}
              {/*    <WebAssetCard*/}
              {/*      imageSrc={'#'}*/}
              {/*      imageDescription={'Stablecoins'}*/}
              {/*    />*/}
              {/*    <WebAssetCard imageSrc={'#'} imageDescription={'Users'} />*/}
              {/*  </WebAssetBlock>*/}
              {/*  <WebAssetBlock className={s.claimingRewards}>*/}
              {/*    <WebAssetCard*/}
              {/*      imageSrc={'#'}*/}
              {/*      imageDescription={'Property Rent'}*/}
              {/*    />*/}
              {/*  </WebAssetBlock>*/}
              {/*</div>*/}
            </div>
          </div>
          {/* </div> */}
        </section>
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
          <div className={s.ourTeamContainer} style={{ minHeight: sectionHeight }}>
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
