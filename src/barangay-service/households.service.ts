import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHouseholdDto } from "src/barangay-dto's/create-household.dto";
import { UpdateHouseholdDto } from "src/barangay-dto's/update-household.dto";
import { Household } from 'src/barangay-entities/household.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HouseholdsService {
  constructor(
    @InjectRepository(Household)
    private readonly householdRepository: Repository<Household>,
  ) {}

  async createHousehold(
    createHouseholdDto: CreateHouseholdDto,
    file: Express.Multer.File,
  ): Promise<Household> {
    const {
      householdNumber,
      householdName,
      streetName,
      subdivision,
      zone,
      sitio,
      purok,
      barangay,
      municipality,
      province,
      structureMaterials,
      numberOfRooms,
      numberOfToilets,
      allowBoarders,
      hasRentalPermit,
      hasBackyardGarden,
      otherIncomeSource,
      numberOfPets,
      numberOfTwoWheeledVehicles,
      numberOfThreeWheeledVehicles,
      numberOfFourWheeledVehicles,
    } = createHouseholdDto;

    const newHousehold = this.householdRepository.create({
      householdNumber,
      householdPhoto: file.path, // ma save ang file path sa databaase
      householdName,
      streetName,
      subdivision,
      zone,
      sitio,
      purok,
      barangay,
      municipality,
      province,
      structureMaterials,
      numberOfRooms,
      numberOfToilets,
      allowBoarders,
      hasRentalPermit,
      hasBackyardGarden,
      otherIncomeSource,
      numberOfPets,
      numberOfTwoWheeledVehicles,
      numberOfThreeWheeledVehicles,
      numberOfFourWheeledVehicles,
    });

    return await this.householdRepository.save(newHousehold);
  }

  //    or **** nag trial rako sa babaw

  //   async create(createHouseholdDto: CreateHouseholdDto, file: Express.Multer.File): Promise<Household> {
  //     const newHousehold = this.householdRepository.create(createHouseholdDto);
  //     newHousehold.household_photo = file.path; // ma save ang file path sa database
  //     return this.householdRepository.save(newHousehold);
  //   }

  async findAllHousehold(): Promise<Household[]> {
    return await this.householdRepository.find();
  }

  async findOneHousehold(householdId: number): Promise<Household> {
    const household = await this.householdRepository.findOneBy({ householdId });
    if (!household) {
      throw new NotFoundException(`Account with ID ${householdId} not found`);
    }
    return household;
  }

  async updateHousehold(
    id: number,
    updateHouseholdDto: UpdateHouseholdDto,
  ): Promise<Household> {
    const household = await this.householdRepository.preload({
      householdId: id,
      ...updateHouseholdDto,
    });
    if (!household) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    return this.householdRepository.save(household);
  }

  async removeHousehold(householdId: number): Promise<void> {
    const result = await this.householdRepository.delete(householdId);
    if (result.affected === 0) {
      throw new NotFoundException(`Account with ID ${householdId} not found`);
    }
  }
}
