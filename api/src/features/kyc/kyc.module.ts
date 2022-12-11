import { Module } from '@nestjs/common';
import {KycController} from "./kyc.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {HooksManager} from "./hooks-manager";
import {Hook} from "./hook.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Hook])],
  controllers: [KycController],
  providers: [HooksManager],
})
export class KycModule {}
