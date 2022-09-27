import { FC } from 'react';
import s from './styles.module.scss';

type Props = {
  top?: string;
};

const BackgroundVisuals: FC<Props> = ({ top }) => (
  <>
    <div className={s.ellipseViolet} style={{ top }}></div>
    <div className={s.ellipseBlue} style={{ top }}></div>
    <div className={s.ellipseCyan} style={{ top }}></div>
  </>
);

export default BackgroundVisuals;
