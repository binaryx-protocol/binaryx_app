import { FC } from 'react';
import s from './styles.module.scss';

type Props = {
  heading: string;
  preTitle?: string;
  body: string;
  id?: string;
  onButtonClick?: () => void;
};

const SectionElement: FC<Props> = ({
  heading,
  preTitle,
  id,
  body,
  onButtonClick,
}) => (
  <section id={id} className={s.block}>
    <div className={s.infoBlock}>
      {preTitle && <p className={s.weAreHere}>{preTitle}</p>}
      <h2 className={s.title}>{heading}</h2>
      <p className={s.description}>{body}</p>
    </div>
    <button type="submit" className={s.btnWaitlist} onClick={onButtonClick}>
      Join waitlist
    </button>
  </section>
);

export default SectionElement;
