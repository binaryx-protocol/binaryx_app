import Link from 'next/link'
import styles from './AdminAssetsListController.module.scss'
import Button from "@mui/material/Button";
// import * as metaMaskModel from "../../models/metaMaskModel";
import * as assetsModel from "../models/assetsModel";
import {useAtomValue} from "jotai";

export const AdminAssetsListController = () => {
  const $blockchainAssets = useAtomValue(assetsModel.$blockchainAssets)
  console.log('$blockchainAssets', $blockchainAssets)

  return (
    <div className={styles.container}>
      <div className={styles.topNav}>
        <h1>
          Assets
        </h1>
        <div>
          <Link href={'/'} passHref>
            <Button variant="outlined" href="#outlined-buttons">
              Back
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
