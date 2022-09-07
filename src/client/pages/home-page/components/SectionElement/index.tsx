import { FC, ReactChild } from 'react';
import s from './styles.module.scss';

type Props = {
  heading: string;
  imageSrc: string;
  alt?: string;
  children?: ReactChild | ReactChild[];
};

const SectionElement: FC<Props> = ({
  heading,
  imageSrc,
  alt,
  children,
}: Props) => (
  <main className={s.block}>
    <div className={s.description}>
      <p className={s.weAreHere}>We are here to:</p>
      <h2 className={s.title}>{heading}</h2>
      {children}
      <button type="submit" className={s.btnWaitlist}>
        Join waitlist
      </button>
    </div>
    <img className={s.imageBlock} src={imageSrc} alt={alt} />
  </main>
);

export default SectionElement;
