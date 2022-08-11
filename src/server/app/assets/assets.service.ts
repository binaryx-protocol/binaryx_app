import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository, FindOneOptions, DeepPartial } from 'typeorm';

import { Asset } from './asset.entity';
import { CreateAssetDto } from './dto/create-asset.dto';
import { Order } from '../orders/order.entity';
import { CreateOrderDto, CreateOrderFromAssetDetailsDto } from '../orders/dto/create-order.dto';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset)
    private assetsRepository: Repository<Asset>,
  ) {}

  create(asset: CreateAssetDto) {
    return this.assetsRepository.save(asset);
  }

  update(params: FindOneOptions<Asset>, asset: CreateAssetDto) {
    return this.assetsRepository.update({ name: asset.name }, asset);
  }

  findOne(params: FindOneOptions<Asset> = {}) {
    return this.assetsRepository.findOne(params);
  }

  findAll(params: FindManyOptions<Asset> = {}) {
    return this.assetsRepository.find(params);
  }

  async findOrCreateOne(params: FindOneOptions<Asset>, assetDto: CreateAssetDto) {
    let asset: Asset | DeepPartial<Asset>[];

    asset = await this.findOne(params);
    if (!asset) {
      asset = await this.create(assetDto);
    }

    return asset;
  }

}
