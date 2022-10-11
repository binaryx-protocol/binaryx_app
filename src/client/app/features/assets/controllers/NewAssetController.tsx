import s from './AssetsDetailsController.module.scss'
import { Gallery } from "../views/Gallery";
import {InvestBlock} from "../views/InvestBlock";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {AssetInfo} from "../views/AssetInfo";
import * as assetDetailsModel from "../models/assetDetailsModel";
import * as newAssetModel from "../models/newAssetModel";
import {useAtomValue, useSetAtom} from "jotai";
import {useEffect} from "react";
import {useRouter} from "next/router";
import {AssetFormFields} from "../views/AssetFormFields";
import Button from "@mui/material/Button";

export const NewAssetController = () => {
  const form = useAtomValue(newAssetModel.$form)
  const onFormChange = useSetAtom(newAssetModel.$onFormChange)
  const onSubmit = useSetAtom(newAssetModel.$onSubmit)
  // const $doLoadAsset = useSetAtom(assetDetailsModel.$doLoadAsset)

  return (
    <div>
      <form noValidate onSubmit={onSubmit}>
        <AssetFormFields form={form} onChange={onFormChange} />
        <Button variant="outlined" type="submit">
          Create
        </Button>
      </form>
    </div>
  )
}

const T = {
}
