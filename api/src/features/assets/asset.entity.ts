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

  @Column()
  scAddress: string;

  @Column()
  scId: string;

  @Column()
  cTitle: string; // cache only

  @Column()
  cStatus: string; // cache only

  @Column()
  landType: string;

  @Column()
  landArea: number;

  @Column()
  propertyType: string;

  @Column()
  propertyArea: string;

  @Column()
  beds: number;

  @Column()
  bedrooms: number;

  @Column()
  roomsTotal: number;

  @Column()
  kitchens: number;

  @Column()
  livingRooms: number;

  @Column()
  terraces: number;

  @Column()
  balconies: number;

  @Column()
  garages: number;

  @Column()
  bathRooms: number;

  @Column()
  occupation: string;

  @Column({ nullable: false, type: 'jsonb', default: [] })
  images: string[];

  @Column({ nullable: false, type: 'jsonb', default: [] })
  saleDocuments: string[];

  @Column({ nullable: false, type: 'jsonb', default: [] })
  agreementIntent: string[];

  @Column({ nullable: false, type: 'jsonb', default: [] })
  sellingAgreement: string[];

  @Column({ nullable: false, type: 'jsonb', default: [] })
  llcPropertyDocuments: string[];

  @Column({ nullable: false, type: 'jsonb', default: [] })
  ownershipAgreement: string[];

  @Column({ nullable: false, type: 'jsonb', default: [] })
  tokenizationAgreement: string[];

  @Column({ nullable: false, type: 'jsonb', default: [] })
  llcFormationDocument: string[];

  @Column({ nullable: false, type: 'jsonb', default: [] })
  notaryConclusion: string[];

  @Column({ nullable: false, type: 'jsonb', default: [] })
  managementDocuments: string[];

  @Column({ nullable: false, type: 'jsonb', default: [] })
  rentalAgreement: string[];

  @Column()
  averageCoCPercentage: number;

  @Column()
  projectedIrrPercentage: number;

  @Column()
  taxesPercentage: number;

  @Column()
  insurancePercentage: number;

  @Column()
  propertyManagementPercentage: number;

  @Column()
  utilitiesPercentage: number;

  @Column()
  llcAdministrationFeePercentage: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
