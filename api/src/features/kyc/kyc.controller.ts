import {Controller, Get, Inject, Post, Req} from '@nestjs/common';
import axios from 'axios';
import { Request } from 'express';
import {ConfigService} from "@nestjs/config";
import { sdk } from "sumsub-node-sdk";

// type KycApiAccessTokenResponse = {
//   id: string // '6391cxxxxxxxxxxxxxxxxa1af',
//   createdAt: string // '2022-12-08 11:00:07',
//   key: string // 'XXXXXXXXXEUKQ',
//   clientId: string // 'xxxxxxxxxxxxxxxxxxxx',
//   inspectionId: string // '639xxxxxxxxxxxx1d1a1b0',
//   externalUserId: string // 'my-external-user-id',
//   info: any // {}
//   fixedInfo: {
//     country: string // 'USA'
//   },
//   email: string
//   phone: string // '+1234567890',
//   requiredIdDocs: {
//     docSets: any[]
//   },
//   review: {
//     reviewId: string // 'qkxXx',
//     attemptId: string // 'jxxxX',
//     attemptCnt: number, // 0
//     levelName: 'basic-kyc-level',
//     createDate: string // '2022-12-08 11:00:07+0000',
//     reviewStatus: string // 'init',
//     priority: 0
//   },
//   type: 'individual',
//   metadata: any[],
//   inspectionMetadata: any[]
// }

@Controller('kyc')
export class KycController {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  @Post('sumsubCreateToken')
  async sumsubCreateToken(@Req() request: Request): Promise<any> {
    const sdkConfig = {
      baseURL: 'https://api.sumsub.com',
      secretKey: this.config.get<string>('SUMSUB_SECRET_KEY'),
      appToken: this.config.get<string>('SUMSUB_APP_TOKEN'),
    }
    console.log('sdkConfig', sdkConfig)
    const sumsub = sdk(sdkConfig);

    // Use the methods
    let response;
    try {
      response = await sumsub.createAccessToken(request.body.userId);
    } catch (e) {
      console.log('e', e)
    }

    return {
      accessToken: response.data
    }
  }

  @Post('sumsubOnSuccess')
  async sumsubOnSuccess(@Req() request: Request): Promise<any> {
    console.log('request.body', request.body)
    return {}
  }
}
