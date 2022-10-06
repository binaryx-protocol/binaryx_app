import Link from 'next/link'
import styles from './AdminAssetsListController.module.scss'
import Button from "@mui/material/Button";
import * as metaMaskModel from "../../../models/metaMaskModel";
import * as assetsModel from "../models/assetsModel";
import {useAtomValue, useSetAtom} from "jotai";
import {AssetStatuses} from "../models/assetsModel";

export const AdminAssetsListController = () => {
  const $blockchainAssets = useAtomValue(assetsModel.$blockchainAssets)
  const $doCreateAsset = useSetAtom(assetsModel.$doCreateAsset)
  const $doActivate = useSetAtom(assetsModel.$doActivate)
  const $doDisable = useSetAtom(assetsModel.$doDisable)
  const $walletConnect = useSetAtom(metaMaskModel.$walletConnect)
  const $walletReadiness = useAtomValue(metaMaskModel.$walletReadiness)
  const $metaMaskState = useAtomValue(metaMaskModel.$metaMaskState)
  const blockchainAssets = $blockchainAssets.state === 'hasData' ? $blockchainAssets.data : null

  return (
    <>
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerNav}>
          <div>Binaryx</div>
          <div>
            {
              $walletReadiness === 'ready'
                ? $metaMaskState.accounts[0]
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
      <div className={styles.container}>
        <div className={styles.crudTopNav}>
          <h1>
            Assets
          </h1>
          <div>
            <Link href={'/'} passHref>
              <Button variant="outlined">
                Back
              </Button>
            </Link>
            {' '}
            <Button variant="outlined" onClick={$doCreateAsset}>
              Create
            </Button>
          </div>
        </div>

        <div className={styles.crudList}>
          {
            blockchainAssets && blockchainAssets.map((blockchainAsset, i) => (
              <div className={styles.crudListItem} key={i}>
                <h2>
                  #{i} {blockchainAsset.name} ({blockchainAsset.symbol})
                </h2>
                <p>
                  {blockchainAsset.title}
                </p>
                <div>
                  <small>{blockchainAsset.description}</small>
                </div>
                <div>
                  {T.status[blockchainAsset.status]}{' '}
                  {
                    blockchainAsset.status === AssetStatuses.upcoming
                    ? <Button variant="outlined" size="small" onClick={() => $doActivate({ id: i })}>
                        Activate
                      </Button>
                      : <Button variant="outlined" size="small" onClick={() => $doDisable({ id: i })}>
                        Disable
                      </Button>
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
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
