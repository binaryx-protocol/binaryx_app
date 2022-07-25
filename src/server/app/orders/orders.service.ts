import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { AssetsService } from '../assets/assets.service';
import {
  CreateOrderDto,
  CreateOrderFromAssetDetailsDto,
} from './dto/create-order.dto';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @Inject(AssetsService) private assetsService: AssetsService,
  ) {}

  create(order: CreateOrderDto) {
    return this.ordersRepository.save(order);
  }

  findOne(params: FindOneOptions<Order> = {}) {
    return this.ordersRepository.findOne(
      Object.assign({ relations: ['user', 'asset'] }, params),
    );
  }

  findAll(params: FindManyOptions<Order> = {}) {
    return this.ordersRepository.find(
      Object.assign({ relations: ['user', 'asset'] }, params),
    );
  }

  async findOrCreateOne(params: FindOneOptions<Order> = {}) {
    let order: Order;

    order = await this.findOne(params);
    if (!order) {
      const conditions = params.where as CreateOrderDto;
      order = await this.create({
        alias: conditions.alias,
        user: conditions.user,
        asset: conditions.asset,
      });
    }

    return order;
  }

  async createFromAssetDetails(params: CreateOrderFromAssetDetailsDto) {
    const asset = await this.assetsService.findOne({
      where: { name: params.assetName },
    });

    return this.findOrCreateOne({
      where: { user: params.user, alias: params.alias, asset: asset },
    });
  }
}
