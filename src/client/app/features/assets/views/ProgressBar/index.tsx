import { FC } from 'react';
import s from './styles.module.scss';

type Props = {
  progress: number;
};

const ProgressBar: FC<Props> = ({ progress }) => {
  return (
    <div className={s.progressBar}>
      <div className={s.filler} style={{ width: progress + '%' }} />
    </div>
  );
};

export default ProgressBar;
