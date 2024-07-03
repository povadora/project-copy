import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsController } from 'src/barangay-controller/accounts.controller';
import { Account } from 'src/barangay-entities/account.entity';
import { AccountsService } from 'src/barangay-service/accounts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    JwtModule.register({
      global: true,
      secret: 'my_secret_key_is_gwapo',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
