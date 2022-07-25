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
    const assets = [{ name: 'this is a asset you can order' }];

    for (const assetParams of assets) {
      const asset = await this.assetsService.findOne({
        where: assetParams,
      });
      if (!asset) {
        await this.assetsService.create(assetParams);
      }
    }
  }
}
