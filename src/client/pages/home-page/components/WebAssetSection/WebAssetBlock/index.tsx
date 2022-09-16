import { FC, ReactChild } from 'react';
import s from './styles.module.scss';

type WebAssetBlock = {
  className?: string;
  children?: ReactChild | ReactChild[];
};

const WebAssetBlock: FC<WebAssetBlock> = ({ className, children }) => {
  return (
    <div className={`${s.defaultStyle} ${className} ${s.isShow}`}>
      {children}
    </div>
  );
};

export default WebAssetBlock;
