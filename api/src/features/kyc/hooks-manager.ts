import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import {HookData} from "./types";
import {Hook} from "./hook.entity";

@Injectable()
export class HooksManager {
  constructor(
    @InjectRepository(Hook)
    private hookRepository: Repository<Hook>,
  ) {}

  async create(data: HookData) {
    const { id } = await this.hookRepository.save({ data });
    if (data.type === 'applicantReviewed' && data.reviewResult.reviewAnswer === 'GREEN') {
      console.log('SEND TO BC');
    }
    await this.hookRepository.update({ id }, { isStoredInBlockchain: true })
    const hook = await this.hookRepository.findOne({ id });
    return { hook }
  }

  findOne(params: FindOneOptions<Hook> = {}) {
    return this.hookRepository.findOne(params);
  }

  findAll(params: FindManyOptions<Hook> = {}) {
    return this.hookRepository.find(params);
  }
}
