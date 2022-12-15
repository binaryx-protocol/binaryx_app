import s from './styles.module.scss'
import React from "react";
import Image from "next/image";
import {
  AssetListingStatus,
  ListAssetsFormsNames,
  UiGeneralInfoForm,
  UiInvestmentReturnForm,
  UiLegalInfoForm, UiRentalManagementForm
} from "../../types";
import {WelcomeScreen} from "./WelcomeScreen";
import {LastScreen} from "./LastScreen";
import {StatusBar} from "./StatusBar";
import {UiForm} from "../../../../../pkg/formType";
import {Button} from "../../../../shared/ui/views/Button";
import {ArrowIconWithoutLine} from "../ArrowIconWithoutLine";
import clsx from "clsx";
import {GeneralInformationForm} from "./GeneralInformationForm";
import {LegalInfoForm} from "./LegalInfoForm";
import {InvestmentReturnForm} from "./InvestmentReturnForm";
import {RentalManagementForm} from "./RentalManagementForm";

type Props = {
  assetListingStatus: AssetListingStatus;
  onChangeAssetListingStatus: (value: AssetListingStatus) => void;
  generalInfoForm: UiGeneralInfoForm;
  legalInfoForm: UiLegalInfoForm;
  investmentReturnForm: UiInvestmentReturnForm;
  rentalManagementForm: UiRentalManagementForm;
  returnHome: () => void;
  onChange: ({
               changeArgs,
               formName
             }: { changeArgs: { values: UiGeneralInfoForm['values'], touches: UiGeneralInfoForm['touches'] }, formName: ListAssetsFormsNames }) => void
}

export const AssetListing = (props: Props) => {
  const {
    assetListingStatus,
    onChangeAssetListingStatus,
    onChange,
    generalInfoForm,
    legalInfoForm,
    investmentReturnForm,
    rentalManagementForm,
    returnHome
  } = props;

  const backButton = () => {
    if (assetListingStatus === AssetListingStatus.generalInfo) onChangeAssetListingStatus(AssetListingStatus.welcome)
    if (assetListingStatus === AssetListingStatus.legalInfo) onChangeAssetListingStatus(AssetListingStatus.generalInfo)
    if (assetListingStatus === AssetListingStatus.investmentAndReturn) onChangeAssetListingStatus(AssetListingStatus.legalInfo)
    if (assetListingStatus === AssetListingStatus.rentalAndManagement) onChangeAssetListingStatus(AssetListingStatus.investmentAndReturn)
  }
  const continueButton = () => {
    if (assetListingStatus === AssetListingStatus.generalInfo) {
      onChangeAssetListingStatus(AssetListingStatus.legalInfo)
    }
    if (assetListingStatus === AssetListingStatus.legalInfo) {
      onChangeAssetListingStatus(AssetListingStatus.investmentAndReturn)
    }
    if (assetListingStatus === AssetListingStatus.investmentAndReturn) {
      onChangeAssetListingStatus(AssetListingStatus.rentalAndManagement)
    }
    if (assetListingStatus === AssetListingStatus.rentalAndManagement) {
      onChangeAssetListingStatus(AssetListingStatus.lastScreen)
    }
  }

  const onChangeLocal = (formName: ListAssetsFormsNames, form: UiForm<any>, elem: HTMLInputElement) => {
    const values = {
      ...form.values,
      [elem.name]: elem.value,
    };
    onChange({changeArgs: {values, touches: form.touches}, formName})
  }
  const onClickLocal = (formName: ListAssetsFormsNames, form: UiForm<any>, name: string, value: string) => {
    const values = {
      ...form.values,
      [name]: value,
    };
    onChange({changeArgs: {values, touches: form.touches}, formName})
  }
  const onFileUpload = (formName: ListAssetsFormsNames, form: UiForm<any>, name: string, files: string[]) => {
    const values = {
      ...form.values,
      [name]: files,
    };
    onChange({changeArgs: {values, touches: form.touches}, formName})
  }

  const inputProps = (form: UiForm<any>, name: string) => {
    const props = {
      name,
      value: form.values[name],
      'aria-invalid': form.errors[name] && form.errors[name],
    };
    return props
  }

  return (
    <div className={s.root}>
      <div className={s.navigation}>
        <div className={s.navigationText}><span className={s.navigationDisabled}>Home</span> · <span
          className={s.navigationActive}>List Property</span></div>
        <div className={s.backButton}>
          <div className={s.backButtonIconWrapper} onClick={returnHome}>
            <Image src={'/svg/arrow.svg'} alt={'paper'} width={15} height={15} className={s.backButtonIcon}/>
          </div>
          <p className={s.backText}>
            Add Property
          </p>
        </div>
      </div>
      {assetListingStatus === AssetListingStatus.welcome &&
        <div className={s.infoScreen}>
          <WelcomeScreen onStatusChange={onChangeAssetListingStatus}/>
        </div>
      }
      {assetListingStatus > AssetListingStatus.welcome && assetListingStatus < AssetListingStatus.lastScreen &&
        <div className={s.mainForms}>
          <StatusBar assetListingStatus={assetListingStatus}/>
          <div className={s.formsWrapper}>
            <div className={s.form}>
              {assetListingStatus === AssetListingStatus.generalInfo &&
                <GeneralInformationForm generalInfoForm={generalInfoForm} inputProps={inputProps}
                                        onChangeLocal={onChangeLocal} onClickLocal={onClickLocal}
                                        onFileUpload={onFileUpload}/>}
              {assetListingStatus === AssetListingStatus.legalInfo &&
                <LegalInfoForm legalInfoForm={legalInfoForm} onFileUpload={onFileUpload}/>}
              {assetListingStatus === AssetListingStatus.investmentAndReturn &&
                <InvestmentReturnForm investmentReturnForm={investmentReturnForm} inputProps={inputProps}
                                      onChangeLocal={onChangeLocal}/>}
              {assetListingStatus === AssetListingStatus.rentalAndManagement &&
                <RentalManagementForm rentalManagementForm={rentalManagementForm} inputProps={inputProps}
                                      onChangeLocal={onChangeLocal}/>}
            </div>
            <div className={s.footerElems}>
              <Button className={s.backButtonForm} onClick={backButton}>
                <ArrowIconWithoutLine width={13} height={13} classname={s.backArrow}/>
                <p>Back</p>
              </Button>
              <div className={s.continueBlock}>
                <Image alt={'detail'} src={'/svg/details.svg'} width={15} height={15}/>
                <p className={s.warning}>Please complete all forms above to -</p>
                <Button className={clsx(s.continueButtonForm, s.continueButtonFormActive)} onClick={continueButton}>
                  <p>Continue</p>
                  <ArrowIconWithoutLine width={13} height={13} classname={s.continueArrow}/>
                </Button>
              </div>
            </div>
          </div>
        </div>
      }
      {assetListingStatus === AssetListingStatus.lastScreen &&
        <div className={s.infoScreen}>
          <LastScreen returnHome={returnHome}/>
        </div>
      }
    </div>
  )
}
