import {Inject, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import {HookData} from "./types";
import {Hook} from "./hook.entity";
import {RpcClient} from "./rpc.client";
import {sdk} from "sumsub-node-sdk";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class HooksManager {
  @Inject(RpcClient)
  private readonly rpcClient: RpcClient;

  private sumsub;

  constructor(
    @InjectRepository(Hook)
    private hookRepository: Repository<Hook>,
    private readonly config: ConfigService
  ) {
    const sdkConfig = {
      baseURL: 'https://api.sumsub.com',
      secretKey: this.config.get<string>('SUMSUB_SECRET_KEY'),
      appToken: this.config.get<string>('SUMSUB_APP_TOKEN'),
    }
    this.sumsub = sdk(sdkConfig);
  }

  async create(data: HookData) {
    const { id } = await this.hookRepository.save({ data });
    if (data.type === 'applicantReviewed' && data.reviewResult.reviewAnswer === 'GREEN') {
      await this.rpcClient.approve(data.externalUserId)
    }
    await this.hookRepository.update({ id }, { isStoredInBlockchain: true })
    const hook = await this.hookRepository.findOne({ id });
    return { hook }
  }

  async updateScIfApprovedBySumSub(externalUserId: string) {
    const applicant = await this.sumsub.getApplicantByExternalUserId(externalUserId);
    if (applicant.data.review.reviewResult.reviewAnswer === 'GREEN') {
      if (!await this.rpcClient.isApproved(externalUserId)) {
        await this.rpcClient.approve(externalUserId);
        console.log('do approve')
      }
    }
  }

  // findOne(params: FindOneOptions<Hook> = {}) {
  //   return this.hookRepository.findOne(params);
  // }
  //
  // findAll(params: FindManyOptions<Hook> = {}) {
  //   return this.hookRepository.find(params);
  // }
}
