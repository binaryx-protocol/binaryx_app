import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../users/user.entity';
import { Asset } from '../assets/asset.entity';

@ObjectType()
@Entity()
export class Order {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  alias: string;

  @Field((_type) => User)
  @ManyToOne((_type) => User, (user) => user.orders, { nullable: false })
  user: User;

  @Field((_type) => Asset)
  @ManyToOne((_type) => Asset, (asset) => asset.orders, { nullable: false })
  asset: Asset;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
