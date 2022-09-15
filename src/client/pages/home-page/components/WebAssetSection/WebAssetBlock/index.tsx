import { FC, ReactChild } from 'react';

type WebAssetBlock = {
  className?: string;
  children?: ReactChild | ReactChild[];
};

const WebAssetBlock: FC<WebAssetBlock> = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export default WebAssetBlock;
