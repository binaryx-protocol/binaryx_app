import classNames from 'classnames';
import { FC, ReactChild } from 'react';
import s from './styles.module.scss';

type Props = {
  order: number;
  children: ReactChild | ReactChild[];
  className: string;
};

const AnimationElement: FC<Props> = ({ order, className, children }) => {
  return (
    <div
      className={classNames('animationElement', s.animation, className)}
      style={{ '--order': order.toString() } as any}
    >
      {children}
    </div>
  );
};

export default AnimationElement;
