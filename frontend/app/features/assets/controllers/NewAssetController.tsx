import s from './NewAssetController.module.scss'
import * as newAssetModel from "../models/newAssetModel";
import {useAtomValue, useSetAtom} from "jotai";
import {SyntheticEvent, useEffect, useState} from "react";
import {useAccount} from "wagmi";
import {AssetListing} from "../views/AssetListing";
import {
  AssetListingStatus,
  ListAssetsFormsNames, UiGeneralInfoForm, UiGeneralInfoFormValues, UiInvestmentReturnForm,
  UiInvestmentReturnFormValues, UiLegalInfoForm, UiLegalInfoFormValues, UiRentalManagementForm,
  UiRentalManagementFormValues
} from "../types";
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
  const onChangeLocal = (formName: ListAssetsFormsNames, form: UiGeneralInfoForm | UiLegalInfoForm | UiRentalManagementForm | UiInvestmentReturnForm, elem: HTMLInputElement) => {
    const values = {
      ...form.values,
      [elem.name]: elem.value,
    };
    onFormChange({changeArgs: {values, touches: form.touches}, formName})
  }
  const onClickLocal = (formName: ListAssetsFormsNames, form: UiGeneralInfoForm | UiLegalInfoForm | UiRentalManagementForm | UiInvestmentReturnForm, name: string, value: string) => {
    const values = {
      ...form.values,
      [name]: value,
    };
    onFormChange({changeArgs: {values, touches: form.touches}, formName})
  }
  const onFileUploadLocal = (formName: ListAssetsFormsNames, form: UiGeneralInfoForm | UiLegalInfoForm | UiRentalManagementForm | UiInvestmentReturnForm, name: string, files: string[]) => {
    const values = {
      ...form.values,
      [name]: files,
    };
    onFormChange({changeArgs: {values, touches: form.touches}, formName})
  }


  return (
    <AssetListing assetListingStatus={assetListingStatus} onChangeAssetListingStatus={setAssetListingStatus}
                  onChangeLocal={onChangeLocal} generalInfoForm={generalInfoForm} legalInfoForm={legalInfoForm}
                  investmentReturnForm={investmentReturnForm} rentalManagementForm={rentalManagementForm}
                  onReturnHome={returnHome} currentForm={currentForm}
                  onCurrentFormChange={setCurrentForm} onClickLocal={onClickLocal} onFileUploadLocal={onFileUploadLocal}/>
    // : <><p>Please Connect your wallet!</p></>
  )
}
