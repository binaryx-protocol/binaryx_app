import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { Asset } from './asset.entity';
import { AssetsService } from './assets.service';
import { GraphQLJSONObject } from 'graphql-type-json';
import { CreateAssetDto } from './dto/create-asset.dto';
import { GraphQLBoolean } from 'graphql';

@Resolver((_of) => Asset)
export class AssetsResolver {
  constructor(@Inject(AssetsService) private assetsService: AssetsService) {}

  @Query((_returns) => [Asset])
  async assets(params: FindManyOptions<Asset> = {}): Promise<Asset[]> {
    return this.assetsService.findAll(params);
  }

  @Mutation((_returns) => Asset)
  // @UseGuards(GqlAuthGuard)
  createAsset(
    // @CurrentUser() user: User,
    @Args({ name: 'contractId', type: () => String }) contractId: string,
    @Args({ name: 'name', type: () => String }) name: string,
    @Args({ name: 'title', type: () => String }) title: string,
    @Args({ name: 'country', type: () => String }) country: string,
    @Args({ name: 'state', type: () => String }) state: string,
    @Args({ name: 'city', type: () => String }) city: string,
    @Args({ name: 'postalCode', type: () => String }) postalCode: string,
    @Args({ name: 'line1', type: () => String }) line1: string,
    @Args({ name: 'line2', type: () => String }) line2: string,
    @Args({ name: 'tokenPrice', type: () => String }) tokenPrice: string,
    @Args({ name: 'tokenTotalSupply', type: () => Int })
    tokenTotalSupply: number,
    @Args({ name: 'tokensLeft', type: () => Int }) tokensLeft: number,
    @Args({ name: 'coc', type: () => String }) coc: string,
    @Args({ name: 'irr', type: () => String }) irr: string,
    @Args({
      name: 'infoItems',
      type: () => GraphQLJSONObject,
    })
    infoItems: { infoItems: Array<{ type: string; value: string }> },
    @Args({ name: 'images', type: () => GraphQLJSONObject })
    images: { images: Array<{ src: string }> },
  ) {
    const assetDto: CreateAssetDto = {
      contractId,
      name,
      title,
      country,
      state,
      city,
      postalCode,
      line1,
      line2,
      tokenPrice,
      tokenTotalSupply,
      tokensLeft,
      coc,
      irr,
      infoItems,
      images,
    };

    return this.assetsService.findOrCreateOne(
      {
        where: {
          name,
        },
      },
      assetDto,
    );
  }

  @Mutation((_returns) => GraphQLBoolean)
  // @UseGuards(GqlAuthGuard)
  async updateAsset(
    // @CurrentUser() user: User,
    @Args({ name: 'contractId', type: () => String }) contractId: string,
    @Args({ name: 'name', type: () => String }) name: string,
    @Args({ name: 'title', type: () => String }) title: string,
    @Args({ name: 'country', type: () => String }) country: string,
    @Args({ name: 'state', type: () => String }) state: string,
    @Args({ name: 'city', type: () => String }) city: string,
    @Args({ name: 'postalCode', type: () => String }) postalCode: string,
    @Args({ name: 'line1', type: () => String }) line1: string,
    @Args({ name: 'line2', type: () => String }) line2: string,
    @Args({ name: 'tokenPrice', type: () => String }) tokenPrice: string,
    @Args({ name: 'tokenTotalSupply', type: () => Int })
    tokenTotalSupply: number,
    @Args({ name: 'tokensLeft', type: () => Int }) tokensLeft: number,
    @Args({ name: 'coc', type: () => String }) coc: string,
    @Args({ name: 'irr', type: () => String }) irr: string,
    @Args({
      name: 'infoItems',
      type: () => GraphQLJSONObject,
    })
    infoItems: { infoItems: Array<{ type: string; value: string }> },
    @Args({ name: 'images', type: () => GraphQLJSONObject })
    images: { images: Array<{ src: string }> },
  ) {
    const assetDto: CreateAssetDto = {
      contractId,
      name,
      title,
      country,
      state,
      city,
      postalCode,
      line1,
      line2,
      tokenPrice,
      tokenTotalSupply,
      tokensLeft,
      coc,
      irr,
      infoItems,
      images,
    };

    const result = await this.assetsService.update(
      {
        where: {
          name,
        },
      },
      assetDto,
    );

    return result.affected > 0;
  }
}
