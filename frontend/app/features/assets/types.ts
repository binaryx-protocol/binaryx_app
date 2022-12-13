import {UiForm} from "../../../pkg/formType";
import {BigNumber} from "ethers";

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
  'active'= 2,
  'sold_out'= 3,
  'disabled'= 4,
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

export type UiNewAssetFormValues = {
  name: string,
  symbol: string,
  title: string,
  description: string,
  status: number,
  tokenInfo_totalSupply: number,
  tokenInfo_apr: number,
  tokenInfo_tokenPriceDe6: number,
  propertyInfo_images: string,
}

export type UiNewAssetForm = UiForm<UiNewAssetFormValues>
export type UiNewAssetFormChangeArgs = {
  values: UiNewAssetForm['values'],
  touches: UiNewAssetForm['touches'],
}


export type UiAssetInvestFormValues = {
  amount: string,
}
export type UiAssetInvestForm = UiForm<UiAssetInvestFormValues>
export type UiAssetInvestFormChangeArgs = {
  values: UiAssetInvestForm['values'],
  touches: UiAssetInvestForm['touches'],
}

