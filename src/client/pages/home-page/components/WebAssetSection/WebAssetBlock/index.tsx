import classNames from 'classnames';
import { FC, LegacyRef, ReactChild } from 'react';
import s from './styles.module.scss';

type Props = {
  className?: string;
  children?: ReactChild | ReactChild[];
  animationOrder: number;
  id?: string;
};

const WebAssetBlock: FC<Props> = ({
  className,
  animationOrder,
  id,
  children,
}) => {
  return (
    <div
      id={id}
      style={{ '--order': animationOrder } as any}
      className={classNames(s.webAssetBlock, className)}
    >
      {children}
    </div>
  );
};

export default WebAssetBlock;
