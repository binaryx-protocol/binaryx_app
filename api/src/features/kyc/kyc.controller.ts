import {Controller, Get, Inject, Post, Req} from '@nestjs/common';
import axios from 'axios';
import { Request } from 'express';
import {ConfigService} from "@nestjs/config";
import { sdk } from "sumsub-node-sdk";



@Controller('kyc')
export class KycController {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  @Post('createToken')
  async createToken(@Req() request: Request): Promise<any> {
    const sdkConfig = {
      baseURL: 'https://api.sumsub.com',
      // baseURL: this.config.get<string>('SUMSUB_BASE_URL'),
      secretKey: this.config.get<string>('SUMSUB_SECRET_KEY'),
      appToken: this.config.get<string>('SUBSUB_APP_TOKEN'),
    }
    console.log('sdkConfig', sdkConfig)
    const sumsub = sdk(sdkConfig);

    // Use the methods
    const response = await sumsub.createApplicant("my-external-user-id", "basic-kyc-level", {
      email: "user@gmail.com",
      phone: "+1234567890",
      fixedInfo: {
        country: "USA",
      },
      metadata: [
        {
          key: "foo",
          value: "bar",
        },
      ],
    });

    console.log(response)
  }

  @Post('sumsubOnSuccess')
  async sumsubOnSuccess(@Req() request: Request): Promise<any> {

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
