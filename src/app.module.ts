import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './barangay-entities/account.entity';
import { AccountsModule } from './barangay-module/accounts.module';
import { HouseholdModule } from './barangay-module/household.module';
import { Household } from './barangay-entities/household.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'bms',
      password: 'bms123',
      database: 'barangay_db',
      entities: [Account, Household],
      synchronize: true,
    }),
    AccountsModule,
    HouseholdModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
