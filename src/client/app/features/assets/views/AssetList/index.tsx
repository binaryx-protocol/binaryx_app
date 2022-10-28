import { FC, ReactNode } from 'react';
import s from './styles.module.scss';

type Props = {
  children: ReactNode
};


const AssetList: FC<Props> = ({ children }) => {
  return (
    <div className={s.assetList}>
      {children}
    </div>
  );
};

export default AssetList;
