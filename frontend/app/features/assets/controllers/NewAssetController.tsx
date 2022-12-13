import s from './NewAssetController.module.scss'
import * as newAssetModel from "../models/newAssetModel";
import {useAtomValue, useSetAtom} from "jotai";
import {AssetFormFields} from "../views/AssetFormFields";
import {SyntheticEvent, useEffect} from "react";
import {Button} from "../../../shared/ui/views/Button";
import {useAccount} from "wagmi";
import {AssetListing} from "../views/AssetListing";

export const NewAssetController = () => {
  const form = useAtomValue(newAssetModel.$form)
  const {address} = useAccount()
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
    <AssetListing/>
  )
}


// <div className={s.page}>
//   <div className={s.container}>
//     <form noValidate onSubmit={onSubmitLocal}>
//       <AssetFormFields form={form} onChange={onFormChange} />
//       <div className={s.formActions}>
//         <Button type="submit">
//           Create
//         </Button>
//       </div>
//     </form>
//
//   </div>
// </div>
