import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Asset } from './asset.entity';
import { AssetsResolver } from './assets.resolver';
import { AssetsService } from './assets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Asset])],
  providers: [AssetsService, AssetsResolver],
  exports: [AssetsService],
})
export class AssetsModule {}
