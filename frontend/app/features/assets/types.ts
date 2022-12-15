import {UiForm} from "../../../pkg/formType";
import {BigNumber} from "ethers";
import {Atom, WritableAtom} from "jotai";

export enum AssetListingStatus {
  welcome,
  generalInfo,
  legalInfo,
  investmentAndReturn,
  rentalAndManagement,
  lastScreen
}

export enum AssetStatuses {
  'upcoming' = 1,
  'active' = 2,
  'sold_out' = 3,
  'disabled' = 4,
}

export type BcAsset = {
  name: string,
  symbol: string,
  title: string,
  description: string,
  status: number,
  tokenInfo_totalSupply: BigNumber,
  tokenInfo_apr: BigNumber,
  tokenInfo_tokenPriceDe6: BigNumber,
  propertyInfo_images: string,
}

export type BcAssetMetaData = {
  tokensLeft: BigNumber,
}

export type UiAssetComputed = {
  tokensSold: number,
  tokensLeft: number,
  tokensTotalSupply: number,
}

export enum LandType {
  landType1 = 'Land Type 1',
  landType2 = 'Land Type 2',
}

export enum PropertyType {
  singleFamily = 'Single-Family Home',
  townHome = 'Townhome',
  bungalow = 'Bungalow',
  ranch = 'Ranch',
  condos = 'Condos',
  victorian = 'Victorian',
  colonial = 'Colonial',
  containerHome = 'Container Home',
  splitLevel = 'Split Level',
  houseboat = 'Houseboat',
  mediterranean = 'Mediterranean',
  tudor = 'Tudor',
  craftsman = 'Craftsman',
  tinyHouse = 'Tiny House',
  coop = 'Co-op',
  cabin = 'Cabin',
  apartment = 'Apartment',
  manufacturedHome = 'Manufactured Home',
  mobileHome = 'Mobile Home',
  midCenturyModernStyle = 'Mid-Century Modern Style',
  capeCod = 'Cape Cod',
  farmhouse = 'Farmhouse',
  mansion = 'Mansion',
}

export enum Occupation {
  occupied = 'Occupied',
  notOccupied = 'Not Occupied'
}


//Investments & Return Form
export type UiInvestmentReturnFormValues = {
  tokenName: string;
  tokenSymbol: string;
  tokenPrice: string;
  tokenAmount: number;
  totalInvestments: number;
  coc: number;
  projectedAssetValueAppreciation: number;
  closingCost: number;
  underlyingAssetPrice: number
}

export type UiInvestmentReturnForm = UiForm<UiInvestmentReturnFormValues>
export type UiInvestmentReturnFormChangeArgs = {
  values: UiInvestmentReturnForm['values'],
  touches: UiInvestmentReturnForm['touches'],
}

//Rental & Management Form
export type UiRentalManagementFormValues = {
  annualGrossRent: number;
  taxes: number;
  insurance: number;
  propertyManagement: number;
  utilities: number;
  initialMaintenanceReserve: number;
  vacancyReserve: number;
  listingFee: number;
  llcAdministrationFee: number;
  upfrontLlcFees: number;
}

export type UiRentalManagementForm = UiForm<UiRentalManagementFormValues>
export type UiRentalManagementFormChangeArgs = {
  values: UiRentalManagementForm['values'],
  touches: UiRentalManagementForm['touches'],
}

//Legal Info Form
export type UiLegalInfoFormValues = {
  saleDocuments: string[];
  agreementIntent: string[];
  sellingAgreement: string[];
  llcPropertyDocuments: string[];
  ownershipAgreement: string[];
  tokenizationAgreement: string[];
  llcFormationDocument: string[];
  notaryConclusion: string[];
  managementDocuments: string[];
  rentalAgreement: string[];
}

export type UiLegalInfoForm = UiForm<UiLegalInfoFormValues>
export type UiLegalInfoFormChangeArgs = {
  values: UiLegalInfoForm['values'],
  touches: UiLegalInfoForm['touches'],
}

//General Info Form
export type UiGeneralInfoFormValues = {
  title: string,
  description: string;
  landType: LandType;
  landArea: number;
  propertyType: PropertyType;
  propertyArea: number;
  beds: number;
  bedrooms: number;
  roomsTotal: number;
  kitchens: number;
  livingRooms: number;
  terraces: number;
  balconies: number;
  garages: number;
  bathrooms: number;
  occupation: Occupation;
  images: string[];
  country: string;
  state: string;
  city: string;
  postalCode: string;
  address: string;
  longitude: string;
  latitude: string
}

export type UiGeneralInfoForm = UiForm<UiGeneralInfoFormValues>
export type UiFormChangeArgs = {
  values: any['values'],
  touches: any['touches'],
}

// Invest Form
export type UiAssetInvestFormValues = {
  amount: string,
}
export type UiAssetInvestForm = UiForm<UiAssetInvestFormValues>
export type UiAssetInvestFormChangeArgs = {
  values: UiAssetInvestForm['values'],
  touches: UiAssetInvestForm['touches'],
}

export interface DefaultAssetListAttr {
  generalInfo: UiGeneralInfoFormValues,
  legalInfo: UiLegalInfoFormValues
  investmentReturn: UiInvestmentReturnFormValues,
  rentalManagement: UiRentalManagementFormValues,
}

export enum ListAssetsFormsNames {
  generalInfoForm = 'generalInfoForm',
  legalInfoForm = 'legalInfoForm',
  investmentReturnForm = 'investmentReturnForm',
  rentalManagementForm = 'rentalManagementForm'
}

export type ListAssetsForms = {
  [key in ListAssetsFormsNames]: WritableAtom<UiGeneralInfoForm, UiGeneralInfoForm>
}
