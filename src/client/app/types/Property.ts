type Property = {
  id: string;
  images: Array<{ src: string }>;
  title: string;
  country: string;
  state: string;
  city: string;
  postalCode: number;
  line1: string;
  line2: string;
  progress: number;
  tokenPrice: string;
  tokensLeft: number;
  irr: string;
  coc: string;
  infoItems: Array<{ type: string; value: string }>;
};

export default Property;
