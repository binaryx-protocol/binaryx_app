import Navigation from './components/HomeNavigation';
import { FC, useEffect, useRef } from 'react';
import s from './styles.module.scss';
import lottie, { LottiePlayer } from 'lottie-web';
import { Link } from '@mui/material';

const HomePageTemp: FC = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current as any,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: require('./animations/B1.json'),
    });
  }, []);

  //! This useEffect implements changing animation on scroll
  // useEffect(() => {
  //   const animDuration = 10000;
  //   const anim = lottie.loadAnimation({
  //     container: container.current!,
  //     renderer: 'svg',
  //     loop: false,
  //     autoplay: true,
  //     animationData: require('./animations/B1.json'),
  //   });

  //   const animatebodymovin = (duration: number) => {
  //     const scrollPosition = window.scrollY;
  //     const maxFrames = anim.totalFrames;
  //     const frame = (maxFrames / 100) * (scrollPosition / (duration / 100));
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
    <div className={s.siteWrap}>
      <Navigation />
      <main className={s.hero}>
        <div className={s.heroWrapper}>
          <main className={s.heroInfo}>
            <h1 className={s.companyTitle}>
              <b style={{ color: 'rgba(0, 180, 204, 1)' }}>Binaryx</b>{' '}
              Community-Powered Real Estate Marketplace
            </h1>
            <div className={s.infoSection}>
              <div className={s.btnCommingSoon}>Coming soon...</div>
            </div>
          </main>
        </div>
        <div className={s.containerAnimation} ref={container}></div>
      </main>
    </div>
  );
};

export default HomePageTemp;
