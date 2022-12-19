import s from './styles.module.scss'
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {
  AssetListingStatus,
  ListAssetsFormsNames, UiFormChangeArgs,
  UiGeneralInfoForm,
  UiInvestmentReturnForm,
  UiLegalInfoForm, UiRentalManagementForm
} from "../../types";
import {WelcomeScreen} from "./WelcomeScreen";
import {LastScreen} from "./LastScreen";
import {StatusBar} from "./StatusBar";
import {UiForm} from "../../../../../pkg/formType";
import {Button} from "../../../../shared/ui/views/Button";
import {ArrowIconWithoutLine} from "../../../../shared/ui/views/ArrowIconWithoutLine";
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
  currentForm: UiGeneralInfoForm | UiLegalInfoForm | UiRentalManagementForm | UiInvestmentReturnForm;
  onCurrentFormChange: (form: UiForm<any>) => void;
  onReturnHome: () => void;
  onFileUploadLocal: (formName: ListAssetsFormsNames, form: UiGeneralInfoForm | UiLegalInfoForm | UiRentalManagementForm | UiInvestmentReturnForm, name: string, files: string[]) => void;
  onClickLocal: (formName: ListAssetsFormsNames, form: UiGeneralInfoForm | UiLegalInfoForm | UiRentalManagementForm | UiInvestmentReturnForm, name: string, value: string) => void;
  onChangeLocal: (formName: ListAssetsFormsNames, form: UiGeneralInfoForm | UiLegalInfoForm | UiRentalManagementForm | UiInvestmentReturnForm, elem: HTMLInputElement) => void
}

export const AssetListing = (props: Props) => {
  const {
    assetListingStatus,
    onChangeAssetListingStatus,
    onChangeLocal,
    generalInfoForm,
    legalInfoForm,
    investmentReturnForm,
    rentalManagementForm,
    onReturnHome,
    onCurrentFormChange,
    onClickLocal,
    onFileUploadLocal,
    currentForm
  } = props;
  useEffect(() => {
    if (assetListingStatus === AssetListingStatus.generalInfo) {
      onCurrentFormChange(generalInfoForm)
    }
    if (assetListingStatus === AssetListingStatus.legalInfo) {
      onCurrentFormChange(legalInfoForm)
    }
    if (assetListingStatus === AssetListingStatus.investmentAndReturn) {
      onCurrentFormChange(investmentReturnForm)
    }
    if (assetListingStatus === AssetListingStatus.rentalAndManagement) {
      onCurrentFormChange(rentalManagementForm)
    }
  }, [generalInfoForm.isValid, legalInfoForm.isValid, investmentReturnForm.isValid, rentalManagementForm.isValid])

  const backButton = () => {
    if (assetListingStatus === AssetListingStatus.generalInfo) onChangeAssetListingStatus(AssetListingStatus.welcome)
    if (assetListingStatus === AssetListingStatus.legalInfo) onChangeAssetListingStatus(AssetListingStatus.generalInfo)
    if (assetListingStatus === AssetListingStatus.investmentAndReturn) onChangeAssetListingStatus(AssetListingStatus.legalInfo)
    if (assetListingStatus === AssetListingStatus.rentalAndManagement) onChangeAssetListingStatus(AssetListingStatus.investmentAndReturn)
  }
  const continueButton = () => {
    if (assetListingStatus === AssetListingStatus.generalInfo && generalInfoForm.isValid) {
      onChangeAssetListingStatus(AssetListingStatus.legalInfo)
      onCurrentFormChange(legalInfoForm)
    }
    if (assetListingStatus === AssetListingStatus.legalInfo && legalInfoForm.isValid) {
      onChangeAssetListingStatus(AssetListingStatus.investmentAndReturn);
      onCurrentFormChange(investmentReturnForm)
    }
    if (assetListingStatus === AssetListingStatus.investmentAndReturn && investmentReturnForm.isValid) {
      onChangeAssetListingStatus(AssetListingStatus.rentalAndManagement)
      onCurrentFormChange(rentalManagementForm)
    }
    if (assetListingStatus === AssetListingStatus.rentalAndManagement && rentalManagementForm.isValid) {
      onChangeAssetListingStatus(AssetListingStatus.lastScreen);
    }
  }
  const onClickLocalGeneralForm = (inputName: string, inputValue: string) => {
    onClickLocal(ListAssetsFormsNames.generalInfoForm, generalInfoForm, inputName, inputValue);
  }
  const onChangeLocalGeneralForm = (element: HTMLInputElement) => {
    onChangeLocal(ListAssetsFormsNames.generalInfoForm, generalInfoForm, element);
  }
  const onFileUploadLocalGeneralForm = (inputName: string, files: string[]) => {
    onFileUploadLocal(ListAssetsFormsNames.generalInfoForm, generalInfoForm, inputName, files);
  }

  const onFileUploadLocalLegalForm = (inputName: string, files: string[]) => {
    onFileUploadLocal(ListAssetsFormsNames.legalInfoForm, legalInfoForm, inputName, files);
  }

  const onChangeLocalInvestmentReturnForm = (element: HTMLInputElement) => {
    onChangeLocal(ListAssetsFormsNames.investmentReturnForm, investmentReturnForm, element);
  }

  const onChangeLocalRentalManagementForm = (element: HTMLInputElement) => {
    onChangeLocal(ListAssetsFormsNames.rentalManagementForm, rentalManagementForm, element);
  }

  const inputPropsGeneralInfoForm = (form: UiGeneralInfoForm, name: keyof UiGeneralInfoForm['values']) => {
    const props = {
      name,
      value: form.values[name],
      'aria-invalid': form.errors[name] && form.errors[name],
    };
    return props
  }
  const inputPropsRentalManagementForm = (form: UiRentalManagementForm, name: keyof UiRentalManagementForm['values']) => {
    const props = {
      name,
      value: form.values[name],
      'aria-invalid': form.errors[name] && form.errors[name],
    };
    return props
  }
  const inputPropsInvestmentReturnForm = (form: UiInvestmentReturnForm, name: keyof UiInvestmentReturnForm['values']) => {
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
          <div className={s.backButtonIconWrapper} onClick={onReturnHome}>
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
                <GeneralInformationForm generalInfoForm={generalInfoForm} inputProps={inputPropsGeneralInfoForm}
                                        onChangeLocal={onChangeLocalGeneralForm} onClickLocal={onClickLocalGeneralForm}
                                        onFileUpload={onFileUploadLocalGeneralForm}/>}
              {assetListingStatus === AssetListingStatus.legalInfo &&
                <LegalInfoForm onFileUpload={onFileUploadLocalLegalForm}/>}
              {assetListingStatus === AssetListingStatus.investmentAndReturn &&
                <InvestmentReturnForm investmentReturnForm={investmentReturnForm} inputProps={inputPropsInvestmentReturnForm}
                                      onChangeLocal={onChangeLocalInvestmentReturnForm}/>}
              {assetListingStatus === AssetListingStatus.rentalAndManagement &&
                <RentalManagementForm rentalManagementForm={rentalManagementForm} inputProps={inputPropsRentalManagementForm}
                                      onChangeLocal={onChangeLocalRentalManagementForm}/>}
            </div>
            <div className={s.footerElems}>
              <Button className={s.backButtonForm} onClick={backButton}>
                <ArrowIconWithoutLine width={13} height={13} classname={s.backArrow}/>
                <p>Back</p>
              </Button>
              <div className={s.continueBlock}>
                <Image alt={'detail'} src={'/svg/details.svg'} width={15} height={15}/>
                <p className={s.warning}>Please complete all forms above to -</p>
                <Button className={clsx(s.continueButtonForm, currentForm.isValid && s.continueButtonFormActive)}
                        onClick={continueButton} disabled={!currentForm.isValid}>
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
          <LastScreen returnHome={onReturnHome}/>
        </div>
      }
    </div>
  )
}
