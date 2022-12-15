import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  cTitle: string;

  @Column({ nullable: false })
  cStatus: string;

  @Column({ nullable: false })
  landType: string;

  @Column({ nullable: false })
  landArea: number;

  @Column({ nullable: false })
  propertyType: string;

  @Column({ nullable: false })
  propertyArea: string;

  @Column({ nullable: false })
  beds: number;

  @Column({ nullable: false })
  bedrooms: number;

  @Column({ nullable: false })
  roomsTotal: number;

  @Column({ nullable: false })
  kitchens: number;

  @Column({ nullable: false })
  livingRooms: number;

  @Column({ nullable: false })
  terraces: number;

  @Column({ nullable: false })
  balconies: number;

  @Column({ nullable: false })
  garages: number;

  @Column({ nullable: false })
  bathRooms: number;

  @Column({ nullable: false })
  occupation: string;

  @Column({ nullable: false, type: 'jsonb' })
  images: string[];

  @Column({ nullable: false, type: 'jsonb' })
  documents: string[];

  @Column({ nullable: false })
  averageCoCPercentage: number;

  @Column({ nullable: false })
  projectedIrrPercentage: number;

  @Column({ nullable: false })
  taxesPercentage: number;

  @Column({ nullable: false })
  insurancePercentage: number;

  @Column({ nullable: false })
  propertyManagementPercentage: number;

  @Column({ nullable: false })
  utilitiesPercentage: number;

  @Column({ nullable: false })
  llcAdministrationFeePercentage: number;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
