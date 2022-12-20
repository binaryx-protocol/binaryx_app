import ElegantValidator from 'elegant-validator'
import {TValidatorResult} from 'elegant-validator/src'
import defaultMessagesEn from 'elegant-validator/src/defaultMessagesEn'
import defaultValidators from 'elegant-validator/src/defaultValidators'
import {UiFormValidatorRules} from "../../../../pkg/formType";
import {
  UiGeneralInfoFormValues,
  UiInvestmentReturnFormValues,
  UiLegalInfoFormValues,
  UiRentalManagementFormValues
} from "../types";

const ev = new ElegantValidator(defaultValidators, defaultMessagesEn)
const generalInfoSchema: UiFormValidatorRules<UiGeneralInfoFormValues> = {
  title: ['required', 'length:2:127'],
  description: ['required', 'length:10:127'],
  landType: ['required'],
  landArea: ['required'],
  propertyType: ['required'],
  propertyArea: ['required'],
  beds: ['required'],
  bedrooms: ['required'],
  roomsTotal: ['required'],
  kitchens: ['required'],
  livingRooms: ['required'],
  terraces: ['required'],
  balconies: ['required'],
  garages: ['required'],
  bathrooms: ['required'],
  occupation: ['required'],
  images: ['required'],
  country: ['required'],
  state: ['required'],
  city: ['required'],
  postalCode: ['required'],
  address: ['required'],
  longitude: ['required'],
  latitude: ['required'],
}

const legalInfoSchema: UiFormValidatorRules<UiLegalInfoFormValues> = {
  saleDocuments: ['required'],
  agreementIntent: ['required'],
  sellingAgreement: ['required'],
  llcPropertyDocuments: ['required'],
  ownershipAgreement: ['required'],
  tokenizationAgreement: ['required'],
  llcFormationDocument: ['required'],
  notaryConclusion: ['required'],
  managementDocuments: ['required'],
  rentalAgreement: ['required'],
}

const investmentReturnSchema: UiFormValidatorRules<UiInvestmentReturnFormValues> = {
  tokenName: ['required'],
  tokenSymbol: ['required'],
  tokenPrice: ['required'],
  tokenAmount: ['required'],
  totalInvestments: ['required'],
  coc: ['required'],
  projectedAssetValueAppreciation: ['required'],
  closingCost: ['required'],
  underlyingAssetPrice: ['required'],
}
const rentalManagementSchema: UiFormValidatorRules<UiRentalManagementFormValues> = {
  annualGrossRent: ['required'],
  taxes: ['required'],
  insurance: ['required'],
  propertyManagement: ['required'],
  utilities: ['required'],
  initialMaintenanceReserve: ['required'],
  vacancyReserve: ['required'],
  listingFee: ['required'],
  llcAdministrationFee: ['required'],
  upfrontLlcFees: ['required'],
}

export const assetValidator = {
  isGeneralInfoValid(formData: unknown): Promise<TValidatorResult<unknown>> {
    return ev.isValid(formData, generalInfoSchema)
  },
  isLegalInfoValid(formData: unknown): Promise<TValidatorResult<unknown>> {
    return ev.isValid(formData, legalInfoSchema)
  },
  isInvestmentReturnValid(formData: unknown): Promise<TValidatorResult<unknown>> {
    return ev.isValid(formData, investmentReturnSchema)
  },
  isRentalManagementValid(formData: unknown): Promise<TValidatorResult<unknown>> {
    return ev.isValid(formData, rentalManagementSchema)
  },
}
