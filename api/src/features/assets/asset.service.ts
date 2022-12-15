import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // TODO replace any
  create(user: any) {
     this.usersRepository.save(user);
    return this.usersRepository.save(user);
  }

  findOne(params: FindOneOptions<User> = {}) {
    return this.usersRepository.findOne(params);
  }

  findAll(params: FindManyOptions<User> = {}) {
    return this.usersRepository.find(params);
  }
}
