import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import {HookData} from "./types";
import {Hook} from "./hook.entity";
import {kycSc, wallet} from "./rpc";

@Injectable()
export class HooksManager {
  constructor(
    @InjectRepository(Hook)
    private hookRepository: Repository<Hook>,
  ) {}

  async create(data: HookData) {
    const { id } = await this.hookRepository.save({ data });
    if (data.type === 'applicantReviewed' && data.reviewResult.reviewAnswer === 'GREEN') {
      const owner = await kycSc.owner();
      console.log('owner', owner)
      await kycSc.connect(wallet).approve('0x70997970C51812dc3A010C7d01b50e0d17dc79C8', '123')
      const isApproved = await kycSc.connect(wallet).isApproved('0x70997970C51812dc3A010C7d01b50e0d17dc79C8')
      console.log('isApproved', isApproved)
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
