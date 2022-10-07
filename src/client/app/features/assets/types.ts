
export enum AssetStatuses {
  'upcoming' = 1,
  'active'= 2,
  'sold_out'= 3,
  'disabled'= 4,
}

export type AssetAddress = {
  country: string
  state: string
  city: string
  postalCode: string
  addressLine1: string
  addressLine2: string
}

export type AssetInput = {
  name: string,
  symbol: string,
  title: string,
  description: string,
  status: number,
  originalOwner: string,
  legalDocuments: string[],
  // propertyAddress: AssetAddress,
}
