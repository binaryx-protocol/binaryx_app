import { FC, ReactNode, RefObject } from 'react';
import s from './styles.module.scss';
import classNames from 'classnames';

type Props = {
  heading: string;
  preTitle?: string;
  description: string | ReactNode;
  id?: string;
  onButtonClick?: () => void;
  sectionHeight?: number | null;
  windowHeight?: number | null;
  contentElementRef?: RefObject<HTMLDivElement>;
  isSticky?: boolean
};

const SectionElement: FC<Props> = ({
  heading,
  preTitle,
  id,
  description,
  onButtonClick,
  sectionHeight,
  windowHeight,
  contentElementRef,
  isSticky,
}) => (
  <section id={id} className={s.block} style={{ minHeight: sectionHeight }}>
    <div className={classNames(s.blockContent, { [s.blockContentSticky]: isSticky })} ref={contentElementRef} style={{ height: windowHeight }}>
      <div className={s.infoBlock}>
        {preTitle && <p className={s.weAreHere}>{preTitle}</p>}
        <h2 className={s.title}>{heading}</h2>
        <p className={s.description}>{description}</p>
      </div>
      <button type="submit" className={s.btnWaitlist} onClick={onButtonClick}>
        Join waitlist
      </button>
    </div>
  </section>
);

export default SectionElement;
