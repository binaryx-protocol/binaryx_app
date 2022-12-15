import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './asset.entity';
import { AssetService } from './asset.service';
import {AssetsController} from "./assets.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Asset])],
  providers: [AssetService],
  controllers: [AssetsController],
  exports: [AssetService],
})
export class AssetModule {}
