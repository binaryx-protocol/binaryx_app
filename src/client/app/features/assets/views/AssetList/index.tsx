import { ReactNode } from 'react';
import s from './styles.module.scss';
import AssetListItem from "./AssetListItem";
import { BcAsset } from 'features/assets/types';

type Props = {
  assets: BcAsset[] | null
};

const T = {
  status: {
    1: 'Upcoming',
    2: 'Active',
    3: 'Sold Out',
    4: 'Disabled',
  }
}

const AssetList = ({ assets }: Props) => {
  return (
    <div className={s.grid}>
      {
        assets && assets.map((blockchainAsset, index) => (
          <div key={index} className={s.gridItem}>
            <AssetListItem
              id={index+1}
              status={T.status[blockchainAsset.status as keyof typeof T.status]}
              image={{ src: blockchainAsset.propertyInfo_images.split(',')[0] }}
              title={blockchainAsset.title}
              subTitle={blockchainAsset.description}
              irr={20.5}
              coc={blockchainAsset.tokenInfo_apr.toNumber()}
              tokensLeft={1000}
              tokensTotal={blockchainAsset.tokenInfo_totalSupply.toNumber()}
              collected={10}
            />
          </div>
        ))
      }
    </div>
  );
};

export default AssetList;
