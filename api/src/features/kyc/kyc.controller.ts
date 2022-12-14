import {Controller, Get, Inject, Post, Req} from '@nestjs/common';
import { Request } from 'express';
import {ConfigService} from "@nestjs/config";
import { sdk } from "sumsub-node-sdk";
import {HookData} from "./types";
import {HooksManager} from "./hooks.manager";

@Controller('kyc')
export class KycController {
  @Inject(ConfigService)
  private readonly config: ConfigService

  @Inject(HooksManager)
  private readonly hooksHandler: HooksManager;

  @Post('sumsubCreateToken')
  async sumsubCreateToken(@Req() request: Request): Promise<any> {
    const sdkConfig = {
      baseURL: 'https://api.sumsub.com',
      secretKey: this.config.get<string>('SUMSUB_SECRET_KEY'),
      appToken: this.config.get<string>('SUMSUB_APP_TOKEN'),
    }
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
    const eventData = request.body as HookData
    const { hook } = await this.hooksHandler.create(eventData)
    return hook
  }
}
