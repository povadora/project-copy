import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { CreateHouseholdDto } from "src/barangay-dto's/create-household.dto";
import { UpdateHouseholdDto } from "src/barangay-dto's/update-household.dto";
import { HouseholdsService } from 'src/barangay-service/households.service';

@Controller('household')
export class HouseholdController {
  constructor(private readonly householdService: HouseholdsService) {}

  @Post('create-household')
  @UseInterceptors(
    FileInterceptor('householdPhoto', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  createHousehold(
    @Body() createHouseholdDto: CreateHouseholdDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.householdService.createHousehold(createHouseholdDto, file);
  }

  //     mag trial sako
  // //   @Post('create-household')
  // //   createHousehold(@Body() createHouseholdDto: CreateHouseholdDto) {
  // //     return this.householdService.createHousehold(createHouseholdDto);
  // //   }

  @Get('all-household')
  findAllHousehold() {
    return this.householdService.findAllHousehold();
  }

  @Get('household/:id')
  findOneHousehold(@Param('id') id: string) {
    return this.householdService.findOneHousehold(+id);
  }

  @Patch('update-household/:id')
  @UseInterceptors(
    FileInterceptor('householdPhoto', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  updateHousehold(
    @Param('id') id: string,
    @Body() updateHouseholdDto: UpdateHouseholdDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.householdService.updateHousehold(+id, updateHouseholdDto, file);
  }

  @Delete('delete-household/:id')
  removehousehold(@Param('id') id: string) {
    return this.householdService.removeHousehold(+id);
  }
}
