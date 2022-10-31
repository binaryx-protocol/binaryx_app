import { ReactNode } from 'react';
import s from './styles.module.scss';

type Props = {
  children: ReactNode
};

const AssetList = ({ children }: Props) => {
  return (
    <div className={s.assetList}>
      {children}
    </div>
  );
};

export default AssetList;
