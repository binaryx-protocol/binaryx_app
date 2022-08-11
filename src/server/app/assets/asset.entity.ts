import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Order } from '../orders/order.entity';
import {  GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
@Entity()
export class Asset {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  contractId: string;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field()
  @Column({ nullable: false })
  title: string;

  @Field()
  @Column()
  country: string;

  @Field()
  @Column()
  state: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  postalCode: string;

  @Field()
  @Column()
  line1: string;

  @Field()
  @Column()
  line2: string;

  @Field()
  @Column()
  tokenPrice: string;

  @Field(() => Int)
  @Column()
  tokenTotalSupply: number;

  @Field(() => Int)
  @Column()
  tokensLeft: number;

  @Field()
  @Column()
  coc: string;

  @Field()
  @Column()
  irr: string;

  @Field(() => GraphQLJSONObject)
  @Column("jsonb")
  infoItems: { infoItems: Array<{ type: string; value: string }> };

  @Field(() => GraphQLJSONObject)
  @Column("jsonb")
  images: { images: Array<{ src: string }> };

  @Field((_type) => [Order], { nullable: 'items' })
  @OneToMany((_type) => Order, (order) => order.asset)
  orders?: Order[];

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
