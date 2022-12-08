import {Controller, Get, Inject, Post, Req} from '@nestjs/common';
import axios from 'axios';
import { Request } from 'express';
import {ConfigService} from "@nestjs/config";

@Controller('kyc')
export class KycController {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  @Post('createToken')
  async createToken(@Req() request: Request): Promise<any> {
    const response = await axios(createAccessToken({
      externalUserId: 'test1',
      appToken: this.config.get<string>('SUBSUB_ADD_TOKEN'),
      isProduction: this.config.get<string>('SUBSUB_IS_PRODUCTION') === 'true'
    }))
    return response
  }
}

type CreateTokenArgs = { externalUserId: string, appToken: string, isProduction: boolean }

// https://developers.sumsub.com/api-reference/#access-tokens-for-sdks
function createAccessToken ({
                              externalUserId,
                              appToken,
                              isProduction,
                            }: Partial<CreateTokenArgs> = {}) {
  const method = 'post';
  const url = `/resources/accessTokens?userId=${externalUserId}&ttlInSecs=600&levelName=basic-kyc-level`;

  const headers = {
    'Accept': 'application/json',
    'X-App-Token': appToken
  };

  const config: any = {};
  config.baseURL = isProduction ? 'https://api.sumsub.com' : 'https://test-api.sumsub.com'; // is it the same? I did not find in docs yet...

  config.method = method;
  config.url = url;
  config.headers = headers;
  config.data = null;

  console.log('config', config)

  return config;
}
