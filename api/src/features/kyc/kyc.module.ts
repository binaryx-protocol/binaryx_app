import { Module } from '@nestjs/common';
import {KycController} from "./kyc.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {HooksManager} from "./hooks.manager";
import {Hook} from "./hook.entity";
import {RpcClient} from "./rpc.client";

@Module({
  imports: [TypeOrmModule.forFeature([Hook])],
  controllers: [KycController],
  providers: [HooksManager, RpcClient],
})
export class KycModule {}
