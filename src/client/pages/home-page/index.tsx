// @ts-nocheck
import Navigation from './components/HomeNavigation';
import { FC, useEffect, useRef, useState } from 'react';
import SectionElement from './components/SectionElement';
import s from './styles.module.scss';
import TeamBlock from './components/TeamBlock';
import NavSocialImage from './components/NavSocialImage';
import MenuElement from 'components/pages/account_page/AccountMenu/MenuElement';
import lottie from 'lottie-web';
import classNames from 'classnames';
import getCookie from 'utils/getCookie';
import getUrlParams from 'utils/getUrlParams';
import SchemaSection from './components/WebAssetSection/SchemaSection';
import TimelineSection from './components/TimelineSection';
import BgOverlay from './components/BgOverlay';
import PopupMenu from './components/PopupMenu';
import IconDiscord from './components/NavSocialImage/IconDiscord';
import IconTwitter from './components/NavSocialImage/IconTwitter';
import IconLinkedIn from './components/NavSocialImage/IconLinkedIn';
import IconTelegram from './components/NavSocialImage/IconTelegram';

const GoogleAnalytics = () => {
  return (
    <>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-HFY1S4EYJS"></script>
      <script dangerouslySetInnerHTML={{ __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-HFY1S4EYJS');
        ` }}
      />
    </>
  )
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
    container4.current
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
  const currentSectionRef = useRef(0);
  const joinWaitListBtnRef = useRef(null);
  const [bgOverlay, setBgOverlay] = useState({
    isBgOverlayActive: true,
    isBgAnimationActive: true,
    isBgOverlayDark: false,
  });
  const [isBgOverlayDark, setIsBgOverlayDark] = useState(false);
  const [FF_LP_PARALLAX, setFF_LP_PARALLAX] = useState(true);
  const [windowHeight, setWindowHeight] = useState(null);
  const isVideoAnimation = false;
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  useEffect(() => {
    setTimeout(() => {
      setFF_LP_PARALLAX(getUrlParams().get('FF_LP_PARALLAX'));
      setWindowHeight(typeof window !== 'undefined' ? window.innerHeight : 800);
    }, 0);
  }, []);

  useEffect(() => {
    if (!FF_LP_PARALLAX) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100%';
      document.body.parentElement.style.overflow = 'hidden';
      document.body.parentElement.style.height = '100%';
    } else {
      document.body.style.scrollBehavior = 'smooth';
    }

    setTimeout(() => {
      const height = FF_LP_PARALLAX
        ? (window.innerHeight - 1) * 5
        : window.innerHeight - 1;
      setSectionHeight(height);

      if (FF_LP_PARALLAX) {
        return;
      }

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
                [1, 2, 3].includes(nextSection) && direction === 'up'
                  ? 1100
                  : 0;
              animation?.goToAndPlay(nextValue);

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
              const main = document.getElementById('main');
              main.style.height = '100vh';
              main.style.overflow = 'scroll';

              document.querySelector('.fp-watermark')?.remove();
              setSectionHeight(
                FF_LP_PARALLAX ? window.innerHeight * 10 : window.innerHeight,
              );
            },
          });
        });
      }, 0);
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
        // preserveAspectRatio: 'xMidYMid meet',
        preserveAspectRatio: isDesktop ? 'xMaxYMax slice' : 'xMaxYMid slice',
      },
    });
  };

  function getScrollPosition() {
    if (FF_LP_PARALLAX) {
      return window.scrollY;
    }

    return document.getElementById('main')?.scrollTop;
  }

  function getScrollObject() {
    if (FF_LP_PARALLAX) {
      return document;
    }

    return document.getElementById('main');
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
        if (index === 3) {
          return 3;
        }
        return index + 1;
      }
    }

    return 4;
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

    // const scrollPercent = getSectionScrollPercent();


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

  const playVideoAnimation = (animationIndex: number) => {
    if (animationIndex === 0) {
      return;
    }
    const animation = animations.current[animationIndex];
    const section = getSections()[animationIndex - 1];
    const offsetTop = section?.offsetTop;
    const height = section?.clientHeight;

    // const scrollPercent = getSectionScrollPercent();


    // if (section && animation) {
    if (section) {
      const scrollPosition = getScrollPosition();
      const scrollPercent = ((scrollPosition - offsetTop) * 100) / height;


      if (isVideoAnimation) {
        const container = getContainers()[animationIndex];
        const duration = container.firstChild.duration;
        let currentTime = (duration * scrollPercent / 100).toFixed(2);
        if (currentTime > duration) {
          currentTime = duration;
        }
        if (currentTime && !isNaN(currentTime) && container.firstChild.currentTime !== currentTime) {
          container.firstChild.currentTime = currentTime;
        }

        return;
      }

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
    console.log("isMobile", isMobile);
    import(`./animations/${isMobile ? "BM1.json" : "B1.json"}`).then((module) => {
      const anim1 = module.default;
      animations.current[0] = initAnimation({
        animationData: anim1,
        container: document.getElementById('animationContainer1'),
        autoplay: true,
        renderer: 'svg',
      });
    });

    import(`./animations/${isMobile ? "BM2_1.json" : "B2_1.json"}`)
      .then((module) => {
        const anim2 = module.default;
        animations.current[1] = initAnimation({
          animationData: anim2,
          container: document.getElementById('animationContainer2'),
          autoplay: false,
          renderer: 'svg',
        });
      })
      .then(() => import(`./animations/${isMobile ? "BM2_2.json" : "B2_2.json"}`))
      .then((module) => {
        const anim3 = module.default;
        animations.current[4] = initAnimation({
          animationData: anim3,
          container: document.getElementById('animationContainer2_2'),
          autoplay: false,
        });
      }).then(() => import(`./animations/${isMobile ? "BM3.json" : "B3.json"}`))
      .then((module) => {
        const anim3 = module.default;
        animations.current[2] = initAnimation({
          animationData: anim3,
          container: document.getElementById('animationContainer3'),
          autoplay: false,
        });
      })
      .then(() => import(`./animations/${isMobile ? "BM4.json" : "B4.json"}`))
      .then((module) => {
        const anim4 = module.default;
        animations.current[3] = initAnimation({
          animationData: anim4,
          container: document.getElementById('animationContainer4'),
          autoplay: false,
        });
      });
  }

  function initVideoAnimations() {
    // container0.current
  }

  function changeWheelSpeed(container, speedY) {
    if (FF_LP_PARALLAX) {
      return;
    }
    let scrollY = 0;

    const handleScrollReset = function () {
      scrollY = container.scrollTop;
    };
    const handleMouseWheel = function (e) {
      e.preventDefault();
      scrollY += speedY * e.deltaY;
      if (scrollY < 0) {
        scrollY = 0;
      } else {
        const limitY = container.scrollHeight - container.clientHeight;
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
      // }
    };

    container.addEventListener('mouseup', handleScrollReset, {
      passive: false,
    });
    container.addEventListener('mousedown', handleScrollReset, {
      passive: false,
    });
    container.addEventListener('mousewheel', handleMouseWheel, {
      passive: false,
    });

    let removed = false;

    return function () {
      if (removed) {
        return;
      }

      container.removeEventListener('mouseup', handleScrollReset, {
        passive: false,
      });
      container.removeEventListener('mousedown', handleScrollReset, {
        passive: false,
      });
      container.removeEventListener('mousewheel', handleMouseWheel, {
        passive: false,
      });

      removed = true;
    };
  }

  useEffect(() => {
    const main = document.getElementById('main');
    changeWheelSpeed(main, 0.1);

    if (isVideoAnimation) {

      let seeked = false;
      let lastProgress = 0;
      const progressDelta = 0.1;

      function lerp(x, y, t) {
        return (1 - t) * x + t * y;
      }

      // function scrollPlay(){
      //   if (!seeked) {
      //     return;
      //   }
      //   seeked = false;
      //   const currentSection = getCurrentSection();
      //   // const currentSection = 1;
      //   const container = getContainers()[currentSection];
      //   // const container = container1.current;
      //   const video = container.firstChild;
      //   const duration = video.duration;
      //   const scrollProgress = scrollTop / 1000;
      //   const scrollPercent = getSectionScrollPercent(currentSection - 1);
      //   const progress =
      //     Math.round(
      //       // Smoothly approach scroll progress instead of instantly
      //       lerp(lastProgress, scrollProgress, progressDelta) * 100
      //     ) / 100;
      //   let currentTime = progress;
      //   // let currentTime = (duration * scrollPercent / 100).toFixed(2);
      //   // console.log(`scrollPercent: ${scrollPercent} \n currentTime: ${currentTime} \n duration: ${duration} \n currentSection: ${currentSection}`);
      //   // console.log("frame container", container);
      //   if (currentTime > duration) {
      //     currentTime = duration;
      //   }
      //   // console.log("container.firstChild.currentTime", typeof container.firstChild.currentTime, typeof currentTime);
      //   // if (container.firstChild.currentTime.toString() !== currentTime) {
      //   console.log(`currentTime ${currentTime}`);
      //   // if (currentTime && !isNaN(currentTime) && container.firstChild.currentTime !== currentTime) {
      //   //   container.firstChild.currentTime = currentTime;
      //   // }
      //   // }
      //   if (currentTime) {
      //     video.currentTime = currentTime;
      //     lastProgress = currentTime;
      //     console.log(`currentTime ${currentTime}`);
      //   }
      //   window.requestAnimationFrame(scrollPlay);
      //
      //   container1.current.addEventListener("seeked", () => {
      //     console.log("seeked");
      //     seeked = true;
      //   });
      // }

      function scrollPlayV2(){
        var frameNumber = 0, // start video at frame 0
          // lower numbers = faster playback
          playbackConst = 500;
        const vid = document.getElementById("video2");
        var frameNumber  = window.pageYOffset/playbackConst;
        vid.currentTime  = frameNumber;
        // window.requestAnimationFrame(scrollPlay);
      }

      // window.requestAnimationFrame(scrollPlayV2);
    } else {
      initAnimations(true);

      function play(){
        // const scrollPosition = getScrollPosition();
        const currentSection = getCurrentSection();
        playAnimation(currentSection);
        updateContainerStyles();
        // let frameNumber  = window.pageYOffset/playbackConst;
        // vid.currentTime  = frameNumber;
        window.requestAnimationFrame(play);
      }

      window.requestAnimationFrame(play);
    }

    window.addEventListener('resize', () => {
      lottie.destroy();
      initAnimations();
    });

    getScrollObject().addEventListener('scroll', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const currentSection = getCurrentSection();
      const sectionContentPrev = getSectionContents()[currentSection - 1];
      const sectionContentNext = getSectionContents()[currentSection];
      const scrollPercent = getSectionScrollPercent(currentSection - 1);
      if (sectionContentPrev) {
        const opacity =
          scrollPercent > 90 ? 1 - (10 - (100 - scrollPercent)) / 10 : 1;
        sectionContentPrev.style.opacity = opacity;
      }
      if (sectionContentNext) {
        const opacity =
          scrollPercent > 95 ? (5 - (100 - scrollPercent)) / 10 : 0;

        sectionContentNext.style.opacity = opacity;
      }
      if (currentSection === 1 && scrollPercent < 50) {
        sectionContentPrev.style.opacity =
          scrollPercent > 5 ? (95 - (100 - scrollPercent)) / 10 : 0;
      }

      if (currentSection >= 4) {
        setIsBgOverlayDark(() => true);
      } else if (currentSection <= 4) {
        setIsBgOverlayDark(() => false);
      }

      if (window.scrollY > 500) {
        joinWaitListBtnRef.current.classList.add(s.btnJoinWaitlistNext);
      } else {
        joinWaitListBtnRef.current.classList.remove(s.btnJoinWaitlistNext);
      }

      // updateContainerStyles();

      // playAnimation(currentSection);

      updateOverlayStyles();

      // for (const section of getSections()) {
      //   const sectionContentElement = section?.querySelector('.blockContent');
      //   sectionContentElement.style.opacity = scrollPercent >= 90 ? 0.5 : 1;
      // }

      // console.log(
      //   `currentSection ${currentSection} / scrollPercent ${scrollPercent}`,
      // );
    });

    updateContainerStyles();
  }, []);

  // useEffect(function testVideo() {
  //   const scroller = document.querySelector("body");
  //   const video = document.querySelector("#video2");
  //   let seeked = false;
  //
  //   let lastProgress = 0;
  //   const progressDelta = 0.1;
  //
  //   function lerp(x, y, t) {
  //     return (1 - t) * x + t * y;
  //   }
  //
  //   (function tick() {
  //     requestAnimationFrame(tick);
  //     if (!seeked) return;
  //     seeked = false;
  //     const { scrollHeight, clientHeight, scrollTop } = scroller;
  //     const maxScroll = 10000; //scrollHeight - clientHeight;
  //     const scrollProgress = scrollTop / Math.max(maxScroll, 1);
  //     // Round to 2 decimal places
  //     const progress =
  //       Math.round(
  //         // Smoothly approach scroll progress instead of instantly
  //         lerp(lastProgress, scrollProgress, progressDelta) * 100
  //       ) / 100;
  //     video.currentTime = video.duration * progress;
  //     lastProgress = progress;
  //   })();
  //
  //   video.addEventListener("seeked", () => {
  //     seeked = true;
  //   });
  //   video.currentTime = 0.001;
  // }, []);

  function updateOverlayStyles() {
    const overlay = document.getElementById('bg-overlay');
    const section = getSections()[2];
    const scrollPosition = document.getElementById('main').scrollTop;
    const scrollPercent =
      ((scrollPosition - section?.offsetTop) * 100) / section?.clientHeight;
    overlay.style.transition = 'none';
    if (scrollPercent > 0) {
      overlay.style.backgroundColor = `rgba(27, 27, 27, ${scrollPercent / 100}`;
      const animationOpacity = 1 - scrollPercent / 100;
      container3.current.style.opacity = animationOpacity;
    } else {
      overlay.style.backgroundColor = 'rgba(27, 27, 27, 0)';
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
    // const scrollPosition = getScrollPosition()
    const scrollPercent = getSectionScrollPercent(currentSection - 1);

    if (container1.current) {
      container1.current.style.display =
        currentSection === 0 ? 'block' : 'none';
      container2.current.style.display =
        currentSection === 1 ? 'block' : 'none';
      container2_2.current.style.display =
        currentSection === 1 && window.scrollY < window.innerHeight / 1.7 ? 'block' : 'none';
      container2_2.current.style.transform = `translateY(${
        currentSection === 1 ? 1 - window.scrollY * 1.8 : 0
      }px`;
      // container2_2.current.style.opacity =
      //   currentSection === 1 ? 1 - scrollPercent / 100 : 1;
      container3.current.style.display =
        currentSection === 2 ? 'block' : 'none';
      container4.current.style.display =
        currentSection === 3 ? 'block' : 'none';
    }
  }

  function updateContainerStylesV2(currentSection) {
    if (container1.current) {
      container1.current.style.display =
        currentSection === 0 ? 'block' : 'none';
      container2.current.style.display =
        currentSection === 1 ? 'block' : 'none';
      container3.current.style.display =
        currentSection === 2 ? 'block' : 'none';
      container4.current.style.display =
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
      <Navigation isDark={isBgOverlayDark} />
      <BgOverlay
        id="bg-overlay"
        isBgOverlayActive={bgOverlay.isBgOverlayActive}
        isBgAnimationActive={bgOverlay.isBgAnimationActive}
      />
      <div
        className={s.containerAnimation}
        ref={container1}
        id="animationContainer1"
      >
        {isVideoAnimation && (
          <video preload autoPlay muted>
            <source src="https://binaryxestate.s3.eu-central-1.amazonaws.com/videos/landing-page/B1.mp4" type='video/mp4' />
          </video>
        )}
      </div>
      <div
        className={s.containerAnimation}
        ref={container2_2}
        id="animationContainer2_2"
      />
      <div
        className={s.containerAnimation}
        ref={container2}
        id="animationContainer2"
      >

        {isVideoAnimation && (
          <video muted playsInline id="video2" src="https://binaryxestate.s3.eu-central-1.amazonaws.com/videos/landing-page/B2.mp4">
            {/*<source type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" src="https://www.apple.com/media/us/mac-pro/2013/16C1b6b5-1d91-4fef-891e-ff2fc1c1bb58/videos/macpro_main_desktop.mp4" />*/}
            {/*<source src="https://www.apple.com/media/us/mac-pro/2013/16C1b6b5-1d91-4fef-891e-ff2fc1c1bb58/videos/macpro_main_desktop.mp4" type='video/mp4' />*/}
            {/*<source src="https://binaryxestate.s3.eu-central-1.amazonaws.com/videos/landing-page/B2.mp4" type='video/mp4' />*/}
            {/*<source src="https://binaryxestate.s3.eu-central-1.amazonaws.com/videos/landing-page/B2.webm" type='video/webm' />*/}
          </video>
        )}
      </div>
      <div
        className={s.containerAnimation}
        ref={container3}
        id="animationContainer3"
      />
      <div
        className={s.containerAnimation}
        ref={container4}
        id="animationContainer4"
      />
      <PopupMenu
        isShowing={isShowing}
        setIsShowing={setIsShowing}
        handleFormSubmit={handleFormSubmit}
      />
      {/*<main id="main" className={classNames(s.heroPage, { [s.heroPageParallax]: FF_LP_PARALLAX})} style={{ height: FF_LP_PARALLAX ? "auto" : "100vh", overflow: FF_LP_PARALLAX ? "auto" : "scroll" }}>*/}
      <main
        id="main"
        className={classNames(s.heroPage, s.heroPageParallax, {
          [s.heroPageParallax]: FF_LP_PARALLAX,
        })}
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
                  ref={joinWaitListBtnRef}
                >
                  Join waitlist
                </button>
                <button type="submit" className={s.joinCommunity} onClick={handleJoinWaitListButtonClick}>
                  Join our community
                </button>
              </div>
            </div>
          </section>
          {/*</div>*/}
          {/*<div*/}
          {/*  id="section2"*/}
          {/*  ref={section2Ref}*/}
          {/*  className={classNames(s.wrapper, s.section, 'section')}*/}
          {/*>*/}
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
            sectionHeight={sectionHeight}
            windowHeight={windowHeight}
            contentElementRef={section2ContentRef}
          />
        </div>
        <div
          id="section3"
          ref={section3Ref}
          className={classNames(s.wrapper, s.section, 'section')}
        >
          <SectionElement
            heading="Boosting Economy and scaling Web3"
            description="Increasing assets ownership transferring speed with web3 infrastructure"
            sectionHeight={sectionHeight}
            windowHeight={windowHeight}
            contentElementRef={section3ContentRef}
            onButtonClick={handleJoinWaitListButtonClick}
          />
        </div>
        {/*<div*/}
        {/*  id="section4"*/}
        {/*  ref={section4Ref}*/}
        {/*  className={classNames(s.wrapper, s.section, 'section')}*/}
        {/*>*/}
        {/*  <SectionElement*/}
        {/*    heading="Boosting Economy and scaling Web3"*/}
        {/*    sectionHeight={sectionHeight}*/}
        {/*    onButtonClick={handleJoinWaitListButtonClick}*/}
        {/*  >*/}
        {/*    <p className={s.description}>*/}
        {/*      Increasing assets ownership transferring speed with web3 infrastracture*/}
        {/*    </p>*/}
        {/*  </SectionElement>*/}
        {/*</div>*/}
        <div className={s.sectionsDark}>
          <BgOverlay
            isBgOverlayActive={true}
            isBgAnimationActive={true}
            isBgOverlayAbsolute={true}
            height={windowHeight}
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
          <TimelineSection className={classNames(s.section, 'section')} />
          <section
            id="sectionTeam"
            className={classNames(s.section, s.ourTeam, 'section')}
          >
            <div
              className={s.ourTeamContainer}
              // style={{ minHeight: windowHeight }}
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
                  socialLink={'https://www.linkedin.com/in/andrii-makaveli-b25259150/'}
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
                      icon={<IconDiscord className={s.footerNavSocialImage} width={isMobile ? 36 : 55} height={isMobile ? 26 : 40} fill="#335367" />}
                    />
                    <NavSocialImage
                      link={'https://twitter.com/realBinaryx'}
                      icon={<IconTwitter className={s.footerNavSocialImage} width={isMobile ? 34 : 45} height={isMobile ? 25 : 41} fill="#335367" />}
                    />
                    <NavSocialImage
                      link={'https://www.linkedin.com/company/realbinaryx/'}
                      icon={<IconLinkedIn className={s.footerNavSocialImage} width={isMobile ? 32 : 45} height={isMobile ? 29 : 44} fill="#335367" />}
                    />
                    <NavSocialImage
                      link={'https://t.me/binaryxnews'}
                      icon={<IconTelegram className={s.footerNavSocialImage} width={isMobile ? 30 : 43} height={isMobile ? 30 : 43} fill="#335367" />}
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
    </>
  );
};

export default HomePage;
