import {Controller, Get, Inject, Post, Req} from '@nestjs/common';
import { Request } from 'express';
import {ConfigService} from "@nestjs/config";
import { sdk } from "sumsub-node-sdk";

@Controller('assets')
export class KycController {
  @Inject(ConfigService)
  private readonly config: ConfigService

  @Inject(HooksManager)
  private readonly hooksManager: HooksManager;

  @Post()
  async create(@Req() request: Request): Promise<any> {
    
  }
}
