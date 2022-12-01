import { Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { CurrentUser } from '../auth/graphql/gql-auth.decorator';
import { GqlAuthGuard } from '../auth/graphql/gql-auth.guard';
import { AssetsService } from '../assets/assets.service';
import { User } from '../users/user.entity';
import { Order } from './order.entity';
import { OrdersService } from './orders.service';

@Resolver((_of) => Order)
export class OrdersResolver {
  constructor(
    @Inject(OrdersService) private ordersService: OrdersService,
    @Inject(AssetsService) private assetsService: AssetsService,
  ) {}

  @Query((_returns) => [Order])
  @UseGuards(GqlAuthGuard)
  orders(@CurrentUser() user: User) {
    return this.ordersService.findAll({ where: { user: user } });
  }

  @ResolveField()
  asset(@Parent() order: Order) {
    return this.assetsService.findOne({
      where: { id: order.asset.id },
    });
  }

  @Mutation((_returns) => Order)
  @UseGuards(GqlAuthGuard)
  createOrder(
    @CurrentUser() user: User,
    @Args({ name: 'assetName', type: () => String }) assetName: string,
    @Args({ name: 'alias', type: () => String }) alias: string,
  ) {
    return this.ordersService.createFromAssetDetails({
      alias: alias,
      user: user,
      assetName: assetName,
    });
  }
}
