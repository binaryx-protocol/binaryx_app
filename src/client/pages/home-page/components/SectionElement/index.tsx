import { FC, ReactChild } from 'react';
import s from './styles.module.scss';

type Props = {
  heading: string;
  preTitle?: string;
  children?: ReactChild | ReactChild[];
  id?: string;
  onButtonClick?: () => void;
  sectionHeight?: number | null;
};

const SectionElement: FC<Props> = ({
  heading,
  preTitle,
  id,
  children,
  onButtonClick,
  sectionHeight
}) => (
  <section id={id} className={s.block} style={{ minHeight: sectionHeight }}>
    <div className={s.infoBlock}>
      {preTitle && <p className={s.weAreHere}>{preTitle}</p>}
      <h2 className={s.title}>{heading}</h2>
      {children}
    </div>
    <button type="submit" className={s.btnWaitlist} onClick={onButtonClick}>
      Join waitlist
    </button>
  </section>
);

export default SectionElement;
