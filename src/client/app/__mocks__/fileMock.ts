import Property from "types/Property";

const imagePreview1 = "https://binaryxestate.s3.eu-central-1.amazonaws.com/assets/villas/villa1/69e4daea-4fb9-41c4-9318-43022d9e974e.webp";
const imagePreview2 = "https://binaryxestate.s3.eu-central-1.amazonaws.com/assets/villas/villa1/c207fe94-1dcb-4132-ab2b-ada2a827930e.jpeg";
const imagePreview3 = "https://binaryxestate.s3.eu-central-1.amazonaws.com/assets/villas/villa1/67339a69-8b43-498e-9c00-b8f973b9d6f2.webp";
const imagePreview4 = "https://binaryxestate.s3.eu-central-1.amazonaws.com/assets/villas/villa1/a24acffa-415c-465c-a229-32e958909271.webp";

const imagePreview2_1 = "https://binaryxestate.s3.eu-central-1.amazonaws.com/assets/villas/villa2/villa2/photo_2022-07-17+09.11.29.jpeg";
const imagePreview2_2 = "https://binaryxestate.s3.eu-central-1.amazonaws.com/assets/villas/villa2/villa2/photo_2022-07-17+09.12.00.jpeg";
const imagePreview2_3 = "https://binaryxestate.s3.eu-central-1.amazonaws.com/assets/villas/villa2/villa2/photo_2022-07-17+09.12.01.jpeg";
const imagePreview2_4 = "https://binaryxestate.s3.eu-central-1.amazonaws.com/assets/villas/villa2/villa2/photo_2022-07-17+09.12.06.jpeg";

const imagePreview3_1 = "https://binaryxestate.s3.eu-central-1.amazonaws.com/assets/villas/villa3/fc99210d-5d10-4aa5-a20b-e61f53a1d1a9.webp";
const imagePreview3_2 = "https://binaryxestate.s3.eu-central-1.amazonaws.com/assets/villas/villa3/bd4dfadf-d261-42c6-b779-4e5618ef285d.webp";
const imagePreview3_3 = "https://binaryxestate.s3.eu-central-1.amazonaws.com/assets/villas/villa3/ee6d922d-6b1e-42de-ad99-003851722e9a.webp";
const imagePreview3_4 = "https://binaryxestate.s3.eu-central-1.amazonaws.com/assets/villas/villa3/f39e5d83-6848-4a0f-8383-7ea3bfe4a45a.webp";

const imagePreview4_1 = "https://binaryxestate.s3.eu-central-1.amazonaws.com/assets/villas/villa4/176159855.jpeg";
const imagePreview4_2 = "https://binaryxestate.s3.eu-central-1.amazonaws.com/assets/villas/villa4/65193fbcc9ef78629f0ca09ae95ba09a.webp";
const imagePreview4_3 = "https://binaryxestate.s3.eu-central-1.amazonaws.com/assets/villas/villa4/226806969.jpeg";
const imagePreview4_4 = "https://binaryxestate.s3.eu-central-1.amazonaws.com/assets/villas/villa4/5796445_18101400240068476167.webp";


type Mock = {
  items: Property[];
};

const mock: Mock = {
  items: [
    {
      id: "1",
      images: [
        { src: imagePreview1 },
        { src: imagePreview2 },
        { src: imagePreview3 },
        { src: imagePreview4 },
      ],
      title: "Villa Yapi",
      country: "Indonesia",
      state: "Bali",
      city: "Badung",
      postalCode: 63130,
      line1: "Canggu, Villa Yapi 12",
      line2: "",
      progress: 38,
      tokensLeft: 356,
      tokenPrice: "$50",
      irr: "18.3% IRR",
      coc: "6.6% CoC",
      infoItems: [
        { type: "bed", value: "8 Bed" },
        { type: "bath", value: "2 Bath" },
        { type: "area", value: "3510 sqft" },
        { type: "propertyType", value: "Duplex" },
        { type: "occupation", value: "Occupied" },
      ],
    },
    {
      id: "2",
      images: [
        { src: imagePreview2_1 },
        { src: imagePreview2_2 },
        { src: imagePreview2_3 },
        { src: imagePreview2_4 },
      ],
      title: "5401 Odom Ave",
      country: "Indonesia",
      state: "Bali",
      city: "Badung",
      postalCode: 63130,
      line1: "Kuta, Denpasaar",
      line2: "3",
      progress: 73,
      tokensLeft: 247,
      tokenPrice: "$50",
      irr: "18.3% IRR",
      coc: "6.6% CoC",
      infoItems: [
        { type: "bed", value: "8 Bed" },
        { type: "bath", value: "2 Bath" },
        { type: "area", value: "3510 sqft" },
        { type: "propertyType", value: "Duplex" },
        { type: "occupation", value: "Occupied" },
      ],
    },
    {
      id: "3",
      images: [
        { src: imagePreview3_1 },
        { src: imagePreview3_2 },
        { src: imagePreview3_3 },
        { src: imagePreview3_4 },
      ],
      title: "Villa Pima",
      country: "Indonesia",
      state: "Bali",
      city: "Badung",
      postalCode: 63130,
      line1: "Canggu, Villa Yapi 12",
      line2: "",
      progress: 90,
      tokensLeft: 21,
      tokenPrice: "$50",
      irr: "18.3% IRR",
      coc: "6.6% CoC",
      infoItems: [
        { type: "bed", value: "8 Bed" },
        { type: "bath", value: "2 Bath" },
        { type: "area", value: "3510 sqft" },
        { type: "propertyType", value: "Duplex" },
        { type: "occupation", value: "Occupied" },
      ],
    },
    {
      id: "4",
      images: [
        { src: imagePreview4_1 },
        { src: imagePreview4_2 },
        { src: imagePreview4_3 },
        { src: imagePreview4_4 },
      ],
      title: "Local Guest House",
      country: "Indonesia",
      state: "Bali",
      city: "Badung",
      postalCode: 63130,
      line1: "Ubud, Guest Street 44",
      line2: "5",
      progress: 100,
      tokensLeft: 0,
      tokenPrice: "$50",
      irr: "18.3% IRR",
      coc: "6.6% CoC",
      infoItems: [
        { type: "bed", value: "8 Bed" },
        { type: "bath", value: "2 Bath" },
        { type: "area", value: "3510 sqft" },
        { type: "propertyType", value: "Duplex" },
        { type: "occupation", value: "Occupied" },
      ],
    },
    {
      id: "5",
      images: [
        { src: imagePreview3_1 },
        { src: imagePreview3_2 },
        { src: imagePreview3_3 },
        { src: imagePreview3_4 },
      ],
      title: "Local Guest House",
      country: "Indonesia",
      state: "Bali",
      city: "Badung",
      postalCode: 63130,
      line1: "Ubud, Guest Street 44",
      line2: "5",
      progress: 100,
      tokensLeft: 0,
      tokenPrice: "$50",
      irr: "18.3% IRR",
      coc: "6.6% CoC",
      infoItems: [
        { type: "bed", value: "8 Bed" },
        { type: "bath", value: "2 Bath" },
        { type: "area", value: "3510 sqft" },
        { type: "propertyType", value: "Duplex" },
        { type: "occupation", value: "Occupied" },
      ],
    },
    {
      id: "6",
      images: [
        { src: imagePreview4_1 },
        { src: imagePreview4_2 },
        { src: imagePreview4_3 },
        { src: imagePreview4_4 },
      ],
      title: "Villa Yapi",
      country: "Indonesia",
      state: "Bali",
      city: "Badung",
      postalCode: 63130,
      line1: "Canggu, Villa Yapi 12",
      line2: "",
      progress: 38,
      tokensLeft: 356,
      tokenPrice: "$50",
      irr: "18.3% IRR",
      coc: "6.6% CoC",
      infoItems: [
        { type: "bed", value: "8 Bed" },
        { type: "bath", value: "2 Bath" },
        { type: "area", value: "3510 sqft" },
        { type: "propertyType", value: "Duplex" },
        { type: "occupation", value: "Occupied" },
      ],
    },

    {
      id: "7",
      images: [
        { src: imagePreview1 },
        { src: imagePreview2 },
        { src: imagePreview3 },
        { src: imagePreview4 },
      ],
      title: "Villa Pima",
      country: "Indonesia",
      state: "Bali",
      city: "Badung",
      postalCode: 63130,
      line1: "Canggu, Villa Yapi 12",
      line2: "",
      progress: 90,
      tokensLeft: 21,
      tokenPrice: "$50",
      irr: "18.3% IRR",
      coc: "6.6% CoC",
      infoItems: [
        { type: "bed", value: "8 Bed" },
        { type: "bath", value: "2 Bath" },
        { type: "area", value: "3510 sqft" },
        { type: "propertyType", value: "Duplex" },
        { type: "occupation", value: "Occupied" },
      ],
    },
    {
      id: "8",
      images: [
        { src: imagePreview2_1 },
        { src: imagePreview2_2 },
        { src: imagePreview2_3 },
        { src: imagePreview2_4 },
      ],
      title: "5401 Odom Ave",
      country: "Indonesia",
      state: "Bali",
      city: "Badung",
      postalCode: 63130,
      line1: "Kuta, Denpasaar",
      line2: "3",
      progress: 73,
      tokensLeft: 247,
      tokenPrice: "$50",
      irr: "18.3% IRR",
      coc: "6.6% CoC",
      infoItems: [
        { type: "bed", value: "8 Bed" },
        { type: "bath", value: "2 Bath" },
        { type: "area", value: "3510 sqft" },
        { type: "propertyType", value: "Duplex" },
        { type: "occupation", value: "Occupied" },
      ],
    },
  ],
};

export default mock;
