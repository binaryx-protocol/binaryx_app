import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { OrdersModule } from './orders.module';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';
import { usersFactory, assetsFactory, ordersFactory } from 'test/factories';
import { AssetsModule } from '../assets/assets.module';
import { AssetsService } from '../assets/assets.service';

describe('OrdersResolver', () => {
  let resolver: OrdersResolver;
  let ordersService: OrdersService;
  let usersService: UsersService;
  let assetsService: AssetsService;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          url: process.env.DATABASE_URL,
        }),
        OrdersModule,
        UsersModule,
        AssetsModule,
      ],
    }).compile();

    resolver = moduleRef.get<OrdersResolver>(OrdersResolver);
    ordersService = moduleRef.get<OrdersService>(OrdersService);
    usersService = moduleRef.get<UsersService>(UsersService);
    assetsService = moduleRef.get<AssetsService>(AssetsService);

    await getConnection().synchronize(true);
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  describe('orders', () => {
    it('returns orders of user', async () => {
      const user = await usersService.create(usersFactory.build());
      const asset = await assetsService.create(assetsFactory.build());
      const order = await ordersService.create(
        ordersFactory.build({}, { associations: { user: user, asset: asset } }),
      );

      const result = await resolver.orders(user);

      expect([order]).toMatchObject(result);
    });

    it('does not return orders of another user', async () => {
      const anotherUser = await usersService.create(usersFactory.build());
      const asset = await assetsService.create(assetsFactory.build());
      await ordersService.create(
        ordersFactory.build(
          {},
          { associations: { user: anotherUser, asset: asset } },
        ),
      );

      const user = await usersService.create(usersFactory.build());
      const result = await resolver.orders(user);

      expect(result).toEqual([]);
    });
  });

  describe('createOrder', () => {
    it('returns the order', async () => {
      const user = await usersService.create(usersFactory.build());
      const asset = await assetsService.create(assetsFactory.build());
      const alias = ordersFactory.build().alias;

      const result = await resolver.createOrder(user, asset.name, alias);

      expect(result).toMatchObject({ alias: alias });
    });

    it('creates an order', async () => {
      const user = await usersService.create(usersFactory.build());
      const asset = await assetsService.create(assetsFactory.build());
      const alias = ordersFactory.build().alias;

      await resolver.createOrder(user, asset.name, alias);

      const orderCount = (
        await ordersService.findAll({ where: { user: user } })
      ).length;
      expect(orderCount).toEqual(1);
    });

    it('does not create the same order twice', async () => {
      const user = await usersService.create(usersFactory.build());
      const asset = await assetsService.create(assetsFactory.build());
      const alias = ordersFactory.build().alias;

      await resolver.createOrder(user, asset.name, alias);
      await resolver.createOrder(user, asset.name, alias);

      const orderCount = (
        await ordersService.findAll({ where: { user: user } })
      ).length;
      expect(orderCount).toEqual(1);
    });
  });
});
