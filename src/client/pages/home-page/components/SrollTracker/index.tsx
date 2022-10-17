import { FC, useEffect, useRef, useState } from 'react';
import s from './styles.module.scss';

const ScrollTracker: FC = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollTracker = useRef(null);

  const onScroll = () => {
    const windowScroll = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;

    setScrollTop(scrolled);
  };

  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={s.scrollTrackerBG}>
      <div
        ref={scrollTracker}
        className={s.scrollTracker}
        style={{ width: `${scrollTop}%` }}
      ></div>
    </div>
  );
};

export default ScrollTracker;
