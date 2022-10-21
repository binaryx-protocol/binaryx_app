import s from './NewAssetController.module.scss'
import * as newAssetModel from "../models/newAssetModel";
import {useAtomValue, useSetAtom} from "jotai";
import {AssetFormFields} from "../views/AssetFormFields";
import Button from "@mui/material/Button";
import {SyntheticEvent, useEffect} from "react";
import Link from "next/link";
import {paths} from "../../../../../../pkg/paths";

export const NewAssetController = () => {
  const form = useAtomValue(newAssetModel.$form)
  const onFormChange = useSetAtom(newAssetModel.$onFormChange)
  const onSubmit = useSetAtom(newAssetModel.$onSubmit)
  const onMount = useSetAtom(newAssetModel.$onMount)

  useEffect(() => {
    onMount()
  }, [])

  const onSubmitLocal = (e: SyntheticEvent) => {
    e.preventDefault()
    onSubmit()
    return false
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
        <form noValidate onSubmit={onSubmitLocal}>
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
