import { PartialType } from '@nestjs/mapped-types';
import { CreateHouseholdDto } from './create-household.dto';

export class UpdateHouseholdDto extends PartialType(CreateHouseholdDto) {}
