import s from './AdminAssetsListController.module.scss'
import * as assetsModel from "../models/assetsListModel";
import {useAtomValue} from "jotai";
import AssetList from '../views/AssetList';
import {Container} from "../../../shared/ui/views/Container";
import {NanoLoader} from "../../../shared/ui/views/NanoLoader";
import {useState} from "react";

export const AdminAssetsListController = () => {
  const $blockchainAssets = useAtomValue(assetsModel.$blockchainAssets)
  const blockchainAssets = $blockchainAssets.state === 'hasData' ? $blockchainAssets.data : null
  const [assets, balances] = blockchainAssets || [];
  return (
    <div className={s.root}>
      <Container>
        <div className={s.contentWrapper}>
          <div className={s.pageContent}>
            <div className={s.crudTopNav}>
              <h1>
                Marketplace
              </h1>
            </div>
            <NanoLoader isLoading={!assets?.length} className={s.loader}>
              <AssetList assets={assets || []} balances={balances || []}/>
            </NanoLoader>
          </div>
        </div>
      </Container>
    </div>
  )
}
