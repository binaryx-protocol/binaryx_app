import { FC, useEffect, useRef } from 'react';
import s from './styles.module.scss';

type Props = {
  progressHeights: Array<number>;
};

const ScrollTracker: FC<Props> = ({ progressHeights }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const scrollTrackerRef = useRef<HTMLDivElement>(null);
  const fullProgressHeight = progressHeights.reduce((a, b) => a + b);

  // Logic is working only then sections are completly loaded.
  // In the beggining it's only 837 but after some period of time it's going to work propperly
  //! Looking for a problem
  const onScroll = () => {
    const windowScroll = -document.documentElement.getBoundingClientRect().top;
    const sectionScrolled =
      fullProgressHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / sectionScrolled) * 100;
    console.log(fullProgressHeight, progressHeights);
    if (Math.floor(scrolled) >= 100 || Math.floor(scrolled) === 0) {
      scrollTrackerRef.current.style.opacity = '0%';
    } else {
      progressBarRef.current.style.opacity = '100%';
      scrollTrackerRef.current.style.opacity = '100%';
    }

    progressBarRef.current.style.width = `${scrolled}%`;
  };

  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={scrollTrackerRef}
      style={{ opacity: 0 }}
      className={s.scrollTrackerBG}
    >
      <div
        ref={progressBarRef}
        className={s.scrollTracker}
        style={{ width: 0 }}
      ></div>
    </div>
  );
};

export default ScrollTracker;
