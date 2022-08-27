import { FC } from 'react';
import s from './styles.module.scss';

type Props = {
  title: string;
  value: number | string;
};

const TabRow: FC<Props> = ({ title, value }: Props) => {
  return (
    <section className={s.tabRow}>
      <p>{title}</p>
      <p>{value}</p>
    </section>
  );
};

export default TabRow;
