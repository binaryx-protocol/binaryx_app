import { FC, ReactChild } from 'react';
import s from './styles.module.scss';

type Props = {
  heading: string;
  children?: ReactChild | ReactChild[];
};

const SectionElement: FC<Props> = ({ heading, children }) => (
  <section className={s.block}>
    <div className={s.description}>
      <p className={s.weAreHere}>We are here to:</p>
      <h2 className={s.title}>{heading}</h2>
      {children}
      <button type="submit" className={s.btnWaitlist}>
        Join waitlist
      </button>
    </div>
  </section>
);

export default SectionElement;
