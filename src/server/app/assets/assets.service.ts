import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository, FindOneOptions } from 'typeorm';

import { Asset } from './asset.entity';
import { CreateAssetDto } from './dto/create-asset.dto';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset)
    private assetsRepository: Repository<Asset>,
  ) {}

  create(asset: CreateAssetDto) {
    return this.assetsRepository.save(asset);
  }

  findOne(params: FindOneOptions<Asset> = {}) {
    return this.assetsRepository.findOne(params);
  }

  findAll(params: FindManyOptions<Asset> = {}) {
    return this.assetsRepository.find(params);
  }
}
