import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // TODO replace any
  create(user: any) {
    return this.usersRepository.save(user);
  }

  findOne(params: FindOneOptions<User> = {}) {
    return this.usersRepository.findOne(params);
  }

  findAll(params: FindManyOptions<User> = {}) {
    return this.usersRepository.find(params);
  }
}
