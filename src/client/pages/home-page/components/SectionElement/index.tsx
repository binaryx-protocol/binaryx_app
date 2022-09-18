import { FC, ReactChild } from 'react';
import s from './styles.module.scss';

type Props = {
  heading: string;
  children?: ReactChild | ReactChild[];
  id?: string;
};

const SectionElement: FC<Props> = ({ heading, id, children }) => (
  <section id={id} className={s.block}>
    <div className={s.description}>
      <p className={s.weAreHere}>We are here to:</p>
      <h2 className={s.title}>{heading}</h2>
      {children}
    </div>
    <button type="submit" className={s.btnWaitlist}>
      Join waitlist
    </button>
  </section>
);

export default SectionElement;
