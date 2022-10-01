import classNames from 'classnames';
import { FC, ReactChild } from 'react';
import s from './styles.module.scss';

type Props = {
  className?: string;
  children?: ReactChild | ReactChild[];
  animationOrder: number;
};

const WebAssetBlock: FC<Props> = ({ className, animationOrder, children }) => {
  return (
    <div
      style={{ '--order': animationOrder.toString() } as any}
      className={classNames(s.webAssetBlock, className)}
    >
      {children}
    </div>
  );
};

export default WebAssetBlock;
