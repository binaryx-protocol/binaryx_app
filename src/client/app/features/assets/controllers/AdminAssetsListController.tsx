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

        <div className={s.crudList}>
          {
            blockchainAssets && blockchainAssets.map((blockchainAsset, index) => (
              <div className={s.crudListItem} key={index}>
                <h2>
                  #{index+1} {blockchainAsset.name} ({blockchainAsset.symbol})
                </h2>
                <p>
                  {blockchainAsset.title}
                </p>
                <div>
                  <small>{blockchainAsset.description}</small>
                </div>
                <div>
                  {T.status[blockchainAsset.status as keyof typeof T.status]}{' '}
                  {
                    blockchainAsset.status === AssetStatuses.upcoming
                    ? <Button variant="outlined" size="small" onClick={() => $doActivate({ id: index+1 })}>
                        Activate
                      </Button>
                      : <Button variant="outlined" size="small" onClick={() => $doDisable({ id: index+1 })}>
                        Disable
                      </Button>
                  }
                  {' '}
                  <Link href={paths.showAsset({ id: index+1 })} passHref>
                    <Button variant="outlined" size="small">
                      Invest
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          }
        </div>

        <AssetList>
          <AssetListItem
            status="Active"
            image={{ src: "" }}
            title="621 E Le Claire Rd"
            subTitle="Eldridge, IA 52748"
            irr={20.5}
            coc={15.2}
            tokensLeft={4502}
            tokensTotal={10000}
            collected={45}
          />
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
