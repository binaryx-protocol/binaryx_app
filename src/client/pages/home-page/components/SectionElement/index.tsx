import { FC, ReactChild, RefObject } from 'react';
import s from './styles.module.scss';

type Props = {
  heading: string;
  preTitle?: string;
  children?: ReactChild | ReactChild[];
  id?: string;
  onButtonClick?: () => void;
  sectionHeight?: number | null;
  windowHeight?: number | null;
  contentElementRef?: RefObject<HTMLDivElement>;
};

const SectionElement: FC<Props> = ({
  heading,
  preTitle,
  id,
  children,
  onButtonClick,
  sectionHeight,
  windowHeight,
  contentElementRef,
}) => (
  <section id={id} className={s.block} style={{ minHeight: sectionHeight }}>
    <div className={s.blockContent} ref={contentElementRef} style={{ height: windowHeight }}>
      <div className={s.infoBlock}>
        {preTitle && <p className={s.weAreHere}>{preTitle}</p>}
        <h2 className={s.title}>{heading}</h2>
        {children}
      </div>
      <button type="submit" className={s.btnWaitlist} onClick={onButtonClick}>
        Join waitlist
      </button>
    </div>
  </section>
);

export default SectionElement;
