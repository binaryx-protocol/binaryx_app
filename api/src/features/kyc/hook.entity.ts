import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import {HookData} from "./types";

@Entity()
export class Hook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'jsonb' })
  data: HookData;

  @Column({ nullable: false, default: false })
  isStoredInBlockchain: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
