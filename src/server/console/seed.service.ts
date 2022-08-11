import { Inject } from '@nestjs/common';
import { Console, Command, createSpinner } from 'nestjs-console';
import { AssetsService } from '../app/assets/assets.service';

@Console()
export class SeedService {
  constructor(@Inject(AssetsService) private assetsService: AssetsService) {}

  @Command({
    command: 'seed',
    description: 'Seed DB',
  })
  async seed(): Promise<void> {
    const spin = createSpinner();

    spin.start('Seeding the DB');

    await this.seedAssets();

    spin.succeed('Seeding done');
  }

  async seedAssets() {
    const imagePreview1 = "https://binaryxestate.s3.eu-central-1.amazonaws.com/assets/villas/villa1/69e4daea-4fb9-41c4-9318-43022d9e974e.webp";
    const imagePreview2 = "https://binaryxestate.s3.eu-central-1.amazonaws.com/assets/villas/villa1/c207fe94-1dcb-4132-ab2b-ada2a827930e.jpeg";
    const imagePreview3 = "https://binaryxestate.s3.eu-central-1.amazonaws.com/assets/villas/villa1/67339a69-8b43-498e-9c00-b8f973b9d6f2.webp";
    const imagePreview4 = "https://binaryxestate.s3.eu-central-1.amazonaws.com/assets/villas/villa1/a24acffa-415c-465c-a229-32e958909271.webp";

    const assets = [{
      name: 'Villa Yapi',
      title: 'Villa Yapi',
      contractId: "",
      country: "Indonesia",
      state: "Bali",
      city: "Badung",
      postalCode: "63130",
      line1: "Canggu, Villa Yapi 12",
      line2: "",
      tokensLeft: 356,
      tokenPrice: "50",
      tokenTotalSupply: 10000,
      irr: "20",
      coc: "15.2",
      infoItems: {
        infoItems: [
          { type: "bed", value: "8 Bed" },
          { type: "bath", value: "2 Bath" },
          { type: "area", value: "3510 sqft" },
          { type: "propertyType", value: "Duplex" },
          { type: "occupation", value: "Occupied" },
        ]
      },
      images: {
        images: [
          { src: imagePreview1 },
          { src: imagePreview2 },
          { src: imagePreview3 },
          { src: imagePreview4 },
        ]
      },
    }];

    for (const assetParams of assets) {
      const filteredParams = {
        name: assetParams.name
      };
      const asset = await this.assetsService.findOne({
        where: filteredParams,
      });
      if (!asset) {
        await this.assetsService.create(assetParams);
      }
    }
  }
}
