import { Resolver, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { Asset } from './asset.entity';
import { AssetsService } from './assets.service';

@Resolver((_of) => Asset)
export class AssetsResolver {
  constructor(@Inject(AssetsService) private assetsService: AssetsService) {}

  @Query((_returns) => [Asset])
  async assets(params: FindManyOptions<Asset> = {}): Promise<Asset[]> {
    return this.assetsService.findAll(params);
  }
}
