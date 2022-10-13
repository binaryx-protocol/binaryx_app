import s from './NewAssetController.module.scss'
import {useAtomValue, useSetAtom} from "jotai";
import Button from "@mui/material/Button";
import {useEffect} from "react";
import Link from "next/link";
import {paths} from "../../../../../../pkg/paths";
import {useRouter} from "next/router";
import * as assetDetailsModel from "../models/assetDetailsModel";

export const InvestController = () => {
  const id = parseInt(useRouter().query.id as string);
  const $asset = useAtomValue(assetDetailsModel.$asset)
  const $doLoadAsset = useSetAtom(assetDetailsModel.$doLoadAsset)

  useEffect(() => {
    if (Number.isInteger(id)) {
      $doLoadAsset({ id })
    }
  }, [id])

  const doInvest = () => {}

  if (!$asset) {
    return null // TODO skeleton loader
  }

  return (
    <div className={s.page}>
      <div className={s.container}>
        <div className={s.formNav}>
          <Link href={paths.listAssets()} passHref>
            <Button variant="outlined">
              Back
            </Button>
          </Link>
        </div>
        <h1>Invest</h1>
        {JSON.stringify($asset)}
        <div className={s.formActions}>
          <Button variant="contained" type="submit" size="large" onClick={doInvest}>
            Invest
          </Button>
        </div>
      </div>
    </div>
  )
}

const T = {
}
