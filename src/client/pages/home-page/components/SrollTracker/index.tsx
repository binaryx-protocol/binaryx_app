import { FC, useEffect, useRef } from 'react';
import s from './styles.module.scss';

type Props = {
  progressHeights: Array<number>;
};

const ScrollTracker: FC<Props> = ({ progressHeights }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const fullProgressHeight = progressHeights.reduce((a, b) => a + b);

  const onScroll = () => {
    const windowScroll = -document.documentElement.getBoundingClientRect().top;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    console.log(fullProgressHeight, document.documentElement.scrollHeight);

    if (scrolled !== fullProgressHeight)
      progressBarRef.current.style.width = `${scrolled}%`;
  };

  useEffect(() => {
    document.addEventListener('scroll', onScroll);

    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={s.scrollTrackerBG}>
      <div
        ref={progressBarRef}
        className={s.scrollTracker}
        onScroll={onScroll}
      ></div>
    </div>
  );
};

export default ScrollTracker;
