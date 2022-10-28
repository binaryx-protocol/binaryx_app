import Link from 'next/link'
import styles from './AdminAssetsListController.module.scss'
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
  const $walletConnect = useSetAtom(metaMaskModel.$walletConnect)
  const $metaMaskState = useAtomValue(metaMaskModel.$metaMaskState)
  const $isAccountConnected = useAtomValue(metaMaskModel.$isAccountConnected)
  const $errorMessages = useAtomValue(metaMaskModel.$errorMessages)
  const blockchainAssets = $blockchainAssets.state === 'hasData' ? $blockchainAssets.data : null

  const walletAddress = $metaMaskState.values.accounts?.[0] || ''
  const walletAddressFormatted = walletAddress.substr(0, 5) + '...' + walletAddress.substr(walletAddress.length-3, 3)

  return (
    <div className={styles.assetListController}>
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerNav}>
          <div>Binaryx</div>
          <div>
            {
              $isAccountConnected
                ? walletAddressFormatted
                : (
                  <Button variant="outlined" onClick={$walletConnect}>
                    Connect Wallet
                  </Button>
                )
            }
          </div>
          </div>
        </div>
      </div>
      <div>
        {$errorMessages.join(', ')}
      </div>
      <div className={styles.container}>
        <div className={styles.crudTopNav}>
          <h1>
            Marketplace
          </h1>
          <div>
            <Link href={'/'} passHref>
              <Button variant="outlined">
                Home
              </Button>
            </Link>
            {' '}
            <Link href={paths.newAsset()} passHref>
              <Button variant="outlined">
                ADD
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.crudList}>
          {
            blockchainAssets && blockchainAssets.map((blockchainAsset, index) => (
              <div className={styles.crudListItem} key={index}>
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
          <AssetListItem
            status="Upcoming"
            image={{ src: "" }}
            title="621 E Le Claire Rd"
            subTitle="Eldridge, IA 52748"
            irr={20.5}
            coc={15.2}
            tokensLeft={4502}
            tokensTotal={10000}
            collected={45}
          />
          <AssetListItem
            status="Upcoming"
            image={{ src: "" }}
            title="621 E Le Claire Rd"
            subTitle="Eldridge, IA 52748"
            irr={20.5}
            coc={15.2}
            tokensLeft={4502}
            tokensTotal={10000}
            collected={45}
          />
          <AssetListItem
            status="Upcoming"
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
