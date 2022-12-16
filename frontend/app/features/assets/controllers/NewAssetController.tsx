import s from './NewAssetController.module.scss'
import * as newAssetModel from "../models/newAssetModel";
import {useAtomValue, useSetAtom} from "jotai";
import {SyntheticEvent, useEffect, useState} from "react";
import {useAccount} from "wagmi";
import {AssetListing} from "../views/AssetListing";
import {AssetListingStatus} from "../types";
import {useRouter} from "next/router";
import {paths} from "../../../../pkg/paths";
import {UiForm} from "../../../../pkg/formType";

export const NewAssetController = () => {
  const router = useRouter();
  const generalInfoForm = useAtomValue(newAssetModel.$generalInfoForm)
  const legalInfoForm = useAtomValue(newAssetModel.$legalInfoForm)
  const investmentReturnForm = useAtomValue(newAssetModel.$investmentReturnForm)
  const rentalManagementForm = useAtomValue(newAssetModel.$rentalManagementForm)
  const {address} = useAccount()
  const onFormChange = useSetAtom(newAssetModel.$onFormChange)
  //const onMount = useSetAtom(newAssetModel.$onMount)
  const [assetListingStatus, setAssetListingStatus] = useState<AssetListingStatus>(AssetListingStatus.welcome)
  const [currentForm, setCurrentForm] = useState<UiForm<any>>(generalInfoForm)

  // useEffect(() => {
  //   onMount()
  // }, [])

  const returnHome = async () => {
    await router.push(paths.home())
  }

  return (
    address ? <AssetListing assetListingStatus={assetListingStatus} onChangeAssetListingStatus={setAssetListingStatus}
                            onChange={onFormChange} generalInfoForm={generalInfoForm} legalInfoForm={legalInfoForm}
                            investmentReturnForm={investmentReturnForm} rentalManagementForm={rentalManagementForm}
                            returnHome={returnHome} currentForm={currentForm}
                            onCurrentFormChange={setCurrentForm}/> : <><p>Please Connect your wallet!</p></>
  )
}
