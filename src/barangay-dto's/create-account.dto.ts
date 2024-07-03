import { IsEnum } from 'class-validator';
import { accountRole } from 'src/barangay-entities/account.entity';

export class CreateAccountDto {
  userName: string;

  password: string;

  firstName: string;

  lastName: string;

  @IsEnum(accountRole)
  role: accountRole;
}
