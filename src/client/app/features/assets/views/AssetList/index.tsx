import { ReactNode } from 'react';
import s from './styles.module.scss';
import AssetListItem from "./AssetListItem";
import { BcAsset } from 'features/assets/types';
import {BigNumber} from "ethers";

type Props = {
  assets: BcAsset[]
  balances: BigNumber[]
};

const T = {
  status: {
    1: 'Upcoming',
    2: 'Active',
    3: 'Sold Out',
    4: 'Disabled',
  }
}

const AssetList = ({ assets, balances }: Props) => {
  return (
    <div className={s.grid}>
      {
        assets && assets.map((blockchainAsset, index) => {
          const collectedNumber = blockchainAsset.tokenInfo_totalSupply.toNumber() - balances[index].toNumber()
          const collectedPercentage = collectedNumber / blockchainAsset.tokenInfo_totalSupply.toNumber()
          return (
            <div key={index} className={s.gridItem}>
              <AssetListItem
                id={index+1}
                status={T.status[blockchainAsset.status as keyof typeof T.status]}
                image={{ src: blockchainAsset.propertyInfo_images.split(',')[0] }}
                title={blockchainAsset.title}
                subTitle={blockchainAsset.description}
                irr={20.5}
                coc={blockchainAsset.tokenInfo_apr.toNumber()}
                tokensLeft={balances[index].toNumber()}
                tokensTotal={blockchainAsset.tokenInfo_totalSupply.toNumber()}
                collected={collectedPercentage}
              />
            </div>
          )
        })
      }
    </div>
  );
};

export default AssetList;
