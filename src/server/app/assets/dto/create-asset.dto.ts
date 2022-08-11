export class CreateAssetDto {
  name: string;
  title: string;
  contractId: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  line1: string;
  line2: string;
  tokenPrice: string;
  tokenTotalSupply: number;
  tokensLeft: number;
  coc: string;
  irr: string;
  infoItems: { infoItems: Array<{ type: string; value: string }> };
  images: { images: Array<{ src: string }> };
}
