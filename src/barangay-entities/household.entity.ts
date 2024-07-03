// src/households/entities/household.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Household {
  @PrimaryGeneratedColumn({ name: 'household_id' })
  householdId: number;

  @Column({
    name: 'household_photo',
    type: 'varchar',
    nullable: true,
  })
  householdPhoto: string;

  @Column({ name: 'household_number', type: 'varchar' })
  householdNumber: string;

  @Column({ name: 'household_name', type: 'varchar' })
  householdName: string;

  @Column({
    name: 'steet_name',
    type: 'varchar',
    nullable: true,
  })
  streetName: string;

  @Column({ type: 'varchar', nullable: true })
  subdivision: string;

  @Column({ type: 'varchar', nullable: true })
  zone: string;

  @Column({ type: 'varchar', nullable: true })
  sitio: string;

  @Column({ type: 'varchar', nullable: true })
  purok: string;

  @Column({ type: 'varchar', default: 'Poblacion II' })
  barangay: string;

  @Column({ type: 'varchar', default: 'Tagbilaran City' })
  municipality: string;

  @Column({ type: 'varchar', default: 'Bohol' })
  province: string;

  @Column({
    name: 'structure_materials',
    type: 'varchar',
    nullable: true,
  })
  structureMaterials: string;

  @Column({ name: 'number_of_rooms', type: 'int', nullable: true })
  numberOfRooms: number;

  @Column({ name: 'number_of_toilets', type: 'int', nullable: true })
  numberOfToilets: number;

  @Column({ name: 'allow_boarders', type: 'boolean', nullable: true })
  allowBoarders: boolean;

  @Column({ name: 'has_rental_permit', type: 'boolean', nullable: true })
  hasRentalPermit: boolean;

  @Column({ name: 'has_backyard_garden', type: 'boolean', nullable: true })
  hasBackyardGarden: boolean;

  @Column({
    name: 'other_income_source',
    type: 'varchar',
    nullable: true,
  })
  otherIncomeSource: string;

  @Column({ name: 'number_of_pets', type: 'int', nullable: true })
  numberOfPets: number;

  @Column({
    name: 'number_of_two_wheeled_vehicles',
    type: 'int',
    nullable: true,
  })
  numberOfTwoWheeledVehicles: number;

  @Column({
    name: 'number_of_three_wheeled_vehicles',
    type: 'int',
    nullable: true,
  })
  numberOfThreeWheeledVehicles: number;

  @Column({
    name: 'number_of_four_wheeled_vehicles',
    type: 'int',
    nullable: true,
  })
  numberOfFourWheeledVehicles: number;
}
