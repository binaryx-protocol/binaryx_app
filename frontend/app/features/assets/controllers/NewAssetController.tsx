import s from './NewAssetController.module.scss'
import * as newAssetModel from "../models/newAssetModel";
import {useAtomValue, useSetAtom} from "jotai";
import {SyntheticEvent, useEffect, useState} from "react";
import {Button} from "../../../shared/ui/views/Button";
import {useAccount} from "wagmi";
import {AssetListing} from "../views/AssetListing";
import {AssetListingStatus} from "../types";
import {useRouter} from "next/router";
import {paths} from "../../../../pkg/paths";

export const NewAssetController = () => {
  const router = useRouter();
  const generalInfoForm = useAtomValue(newAssetModel.$generalInfoForm)
  const legalInfoForm = useAtomValue(newAssetModel.$legalInfoForm)
  const investmentReturnForm = useAtomValue(newAssetModel.$investmentReturnForm)
  const rentalManagementForm = useAtomValue(newAssetModel.$rentalManagementForm)
  const {address} = useAccount()
  const onFormChange = useSetAtom(newAssetModel.$onFormChange)
  const onSubmit = useSetAtom(newAssetModel.$onSubmit)
  //const onMount = useSetAtom(newAssetModel.$onMount)
  const [assetListingStatus, setAssetListingStatus] = useState<AssetListingStatus>(AssetListingStatus.welcome)

  console.log('rentalManagementForm', rentalManagementForm)
  // useEffect(() => {
  //   onMount()
  // }, [])

  const onSubmitLocal = (e: SyntheticEvent) => {
    e.preventDefault()
    onSubmit()
    return false
  }

  const returnHome = async () => {
    await router.push(paths.home())
  }

  return (
    <AssetListing assetListingStatus={assetListingStatus} onChangeAssetListingStatus={setAssetListingStatus}
                  onChange={onFormChange} generalInfoForm={generalInfoForm} legalInfoForm={legalInfoForm}
                  investmentReturnForm={investmentReturnForm} rentalManagementForm={rentalManagementForm}
                  returnHome={returnHome}/>
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
