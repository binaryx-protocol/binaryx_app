import Link from 'next/link'
import s from './AdminAssetsListController.module.scss'
import Button from "@mui/material/Button";
import * as metaMaskModel from "../../../core/models/metaMaskModel";
import * as assetsModel from "../models/assetsListModel";
import {useAtomValue, useSetAtom} from "jotai";
import {AssetStatuses} from "../types";
import {paths} from "../../../../../../pkg/paths";
import AssetList from '../views/AssetList';
import AssetListItem from '../views/AssetList/AssetListItem';

export const AdminAssetsListController = () => {
  const $blockchainAssets = useAtomValue(assetsModel.$blockchainAssets)
  const $doActivate = useSetAtom(assetsModel.$doActivate)
  const $doDisable = useSetAtom(assetsModel.$doDisable)
  const $errorMessages = useAtomValue(metaMaskModel.$errorMessages)
  const blockchainAssets = $blockchainAssets.state === 'hasData' ? $blockchainAssets.data : null

  console.log('blockchainAssets', blockchainAssets)

  return (
    <div className={s.assetListController}>
      <div className={s.errors}>
        {$errorMessages.join(', ')}
      </div>
      <div className={s.container}>

        <div className={s.crudTopNav}>
          <h1>
            Marketplace
          </h1>
        </div>

        <AssetList>
          {
            blockchainAssets && blockchainAssets.map((blockchainAsset, index) => (
              <AssetListItem
                key={index}
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
            ))
          }
        </AssetList>
      </div>
    </div>
  )
}

const T = {
  status: {
    1: 'Upcoming',
    2: 'Active',
    3: 'Sold Out',
    4: 'Disabled',
  }
}
