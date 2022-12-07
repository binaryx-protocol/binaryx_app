import { Module } from '@nestjs/common';
import {KycController} from "./kyc.controller";

@Module({
  controllers: [KycController]
})
export class KycModule {}
