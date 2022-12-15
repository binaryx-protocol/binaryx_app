import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { Asset } from './asset.entity';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset)
    private assetsRepository: Repository<Asset>,
  ) {}

  // TODO replace any
  create(user: any) {
    return this.assetsRepository.save(user);
  }

  findOne(params: FindOneOptions<Asset> = {}) {
    return this.assetsRepository.findOne(params);
  }

  findAll(params: FindManyOptions<Asset> = {}) {
    return this.assetsRepository.find(params);
  }
}
