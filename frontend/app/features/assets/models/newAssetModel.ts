import {atom} from 'jotai'
import {
  DefaultAssetListAttr,
  LandType,
  ListAssetsForms,
  ListAssetsFormsNames,
  Occupation,
  PropertyType,
  UiFormChangeArgs, UiGeneralInfoForm, UiInvestmentReturnForm, UiLegalInfoForm, UiRentalManagementForm,
} from "../types";
import {assetValidator} from "./assetValidator";

const defaultAttrs = (): DefaultAssetListAttr => ({
  generalInfo: {
    title: '',
    description: '',
    landType: LandType.landType1,
    landArea: 0,
    propertyType: PropertyType.singleFamily,
    propertyArea: 0,
    beds: 0,
    bedrooms: 0,
    roomsTotal: 0,
    kitchens: 0,
    livingRooms: 0,
    terraces: 0,
    balconies: 0,
    garages: 0,
    bathrooms: 0,
    occupation: Occupation.occupied,
    images: [],
    country: '',
    state: '',
    city: '',
    postalCode: '',
    address: '',
    longitude: '',
    latitude: '',
  },
  legalInfo: {
    saleDocuments: [],
    agreementIntent: [],
    sellingAgreement: [],
    llcPropertyDocuments: [],
    ownershipAgreement:[],
    tokenizationAgreement:[],
    llcFormationDocument: [],
    notaryConclusion:[],
    managementDocuments: [],
    rentalAgreement: [],
  },
  investmentReturn: {
    tokenName: '',
    tokenSymbol: '',
    tokenPrice: '',
    tokenAmount: 0,
    totalInvestments: 0,
    coc: 0,
    projectedAssetValueAppreciation: 0,
    closingCost: 0,
    underlyingAssetPrice: 0,
  },
  rentalManagement: {
    annualGrossRent: 0,
    taxes: 0,
    insurance: 0,
    propertyManagement: 0,
    utilities: 0,
    initialMaintenanceReserve: 0,
    vacancyReserve: 0,
    listingFee: 0,
    llcAdministrationFee: 0,
    upfrontLlcFees: 0,
  }
})

// stores
export const $generalInfoForm = atom<UiGeneralInfoForm>({
  values: defaultAttrs().generalInfo,
  errors: {},
  touches: {},
  isValid: false,
  isSubmitTouched: false,
})
export const $legalInfoForm = atom<UiLegalInfoForm>({
  values: defaultAttrs().legalInfo,
  errors: {},
  touches: {},
  isValid: false,
  isSubmitTouched: false,
})
export const $investmentReturnForm = atom<UiInvestmentReturnForm>({
  values: defaultAttrs().investmentReturn,
  errors: {},
  touches: {},
  isValid: false,
  isSubmitTouched: false,
})
export const $rentalManagementForm = atom<UiRentalManagementForm>({
  values: defaultAttrs().rentalManagement,
  errors: {},
  touches: {},
  isValid: false,
  isSubmitTouched: false,
})

const listAssetsForms: ListAssetsForms = {
  generalInfoForm: $generalInfoForm,
  legalInfoForm: $legalInfoForm,
  investmentReturnForm: $investmentReturnForm,
  rentalManagementForm: $rentalManagementForm
}
// setters
// const $doCreateAsset = atom(null, async (get, set, form: UiNewAssetForm) => {
//   const formValues = {
//     ...form.values,
//     tokenInfo_tokenPriceDe6: form.values.tokenInfo_tokenPriceDe6 * 1e6
//   }
//   const manager = get($controllerSmartContractSigned)
//   // @ts-ignore
//   await manager?.listAsset(...Object.values(formValues));
//   alert("You will see your asset soon. Please, refresh the page.");
//   await router.push(paths.listAssets());
// })

export const $onFormChange = atom(null, (get, set, args: { changeArgs: UiFormChangeArgs, formName: ListAssetsFormsNames }) => {
  set($doUpdateFormValues, args)
  set($doValidateFormValues, args)
})

// export const $onMount = atom(null, (get, set) => {
//   set($doValidateFormValues, get($form))
// })

const $doUpdateFormValues = atom(null, (get, set, args: { changeArgs: UiFormChangeArgs, formName: ListAssetsFormsNames }) => {
  const {changeArgs, formName} = args
  if(formName === ListAssetsFormsNames.generalInfoForm){
    const form = get(listAssetsForms[formName])

    const newForm = {
      ...form,
      values: changeArgs.values,
      touches: changeArgs.touches,
    }
    set(listAssetsForms[formName], newForm)
  }
  if(formName === ListAssetsFormsNames.legalInfoForm){
    const form = get(listAssetsForms[formName])

    const newForm = {
      ...form,
      values: changeArgs.values,
      touches: changeArgs.touches,
    }
    set(listAssetsForms[formName], newForm)
  }
  if(formName === ListAssetsFormsNames.investmentReturnForm){
    const form = get(listAssetsForms[formName])

    const newForm = {
      ...form,
      values: changeArgs.values,
      touches: changeArgs.touches,
    }
    set(listAssetsForms[formName], newForm)
  }
  if(formName === ListAssetsFormsNames.rentalManagementForm){
    const form = get(listAssetsForms[formName])

    const newForm = {
      ...form,
      values: changeArgs.values,
      touches: changeArgs.touches,
    }
    set(listAssetsForms[formName], newForm)
  }
})

const $doValidateFormValues = atom(null, (get, set, args: { changeArgs: UiFormChangeArgs, formName: ListAssetsFormsNames }) => {
  const {changeArgs, formName} = args
  if (formName === ListAssetsFormsNames.generalInfoForm) {
    const form = get(listAssetsForms[formName])
    assetValidator.isGeneralInfoValid(changeArgs.values)
      .then(({errors, isValid}) => {
        const newForm = {
          ...form,
          errors,
          isValid,
        }
        set(listAssetsForms[formName], newForm)
      })
  }
  if (formName === ListAssetsFormsNames.legalInfoForm) {
    const form = get(listAssetsForms[formName])
    assetValidator.isLegalInfoValid(changeArgs.values)
      .then(({errors, isValid}) => {
        const newForm = {
          ...form,
          errors,
          isValid,
        }
        set(listAssetsForms[formName], newForm)
      })
  }
  if (formName === ListAssetsFormsNames.investmentReturnForm) {
    const form = get(listAssetsForms[formName])
    assetValidator.isInvestmentReturnValid(changeArgs.values)
      .then(({errors, isValid}) => {
        const newForm = {
          ...form,
          errors,
          isValid,
        }
        set(listAssetsForms[formName], newForm)
      })
  }
  if (formName === ListAssetsFormsNames.rentalManagementForm) {
    const form = get(listAssetsForms[formName])
    assetValidator.isRentalManagementValid(changeArgs.values)
      .then(({errors, isValid}) => {
        const newForm = {
          ...form,
          errors,
          isValid,
        }
        set(listAssetsForms[formName], newForm)
      })
  }
})
