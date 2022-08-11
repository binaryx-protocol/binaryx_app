type Property = {
  id: string;
  name: string;
  title: string;
  country: string;
  state: string;
  city: string;
  postalCode: number;
  line1: string;
  line2: string;
  tokenPrice: string;
  tokensLeft: number;
  tokenTotalSupply: string;
  irr: string;
  coc: string;
  images: { images: Array<{ src: string }> };
  infoItems: { infoItems: Array<{ type: string; value: string }> };
};

export default Property;
