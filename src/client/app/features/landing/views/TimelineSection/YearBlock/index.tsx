import { FC } from 'react';
import s from './styles.module.scss';

type Props = {
  animationOrder?: number;
  year: number | string;
};

const YearBlock: FC<Props> = ({ animationOrder, year }) => (
  <div style={{ '--order': animationOrder } as any} className={s.yearBlock}>
    <span className={s.title}>{year}</span>
  </div>
);

export default YearBlock;
