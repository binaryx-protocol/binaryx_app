import s from './NewAssetController.module.scss'
import * as newAssetModel from "../models/newAssetModel";
import {useAtomValue, useSetAtom} from "jotai";
import {AssetFormFields} from "../views/AssetFormFields";
import Button from "@mui/material/Button";
import {useEffect} from "react";
import Link from "next/link";
import {paths} from "../../../../../../pkg/paths";

export const NewAssetController = () => {
  const form = useAtomValue(newAssetModel.$form)
  const onFormChange = useSetAtom(newAssetModel.$onFormChange)
  const onSubmit = useSetAtom(newAssetModel.$onSubmit)
  const onMount = useSetAtom(newAssetModel.$onMount)

  useEffect(onMount, [])

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
        <form noValidate onSubmit={onSubmit}>
          <AssetFormFields form={form} onChange={onFormChange} />

          <div className={s.formActions}>
            <Button variant="contained" type="submit" size="large">
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

const T = {
}
