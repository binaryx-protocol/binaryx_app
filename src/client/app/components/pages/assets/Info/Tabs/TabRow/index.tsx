import { FC } from 'react';
import s from './styles.module.scss';

type Props = {
  title: string;
  value: number | string;
};

const TabRow: FC<Props> = ({ title, value }: Props) => {
  return (
    <div className={s.tabRow}>
      <p>{title}</p>
      <p>{value}</p>
    </div>
  );
};

export default TabRow;