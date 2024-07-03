import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import * as argon from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Account } from 'src/barangay-entities/account.entity';
import { CreateAccountDto } from "src/barangay-dto's/create-account.dto";
import { UpdateAccountDto } from "src/barangay-dto's/update-account.dto";
import { AuthLoginDto } from "src/barangay-dto's/auth-login.dto";

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount(createAccountDto: CreateAccountDto): Promise<Account> {
    const { userName, password, firstName, lastName, role } = createAccountDto;
    const hash = await argon.hash(password);
    const newAccount = this.accountRepository.create({
      userName,
      hash,
      firstName,
      lastName,
      role,
    });

    return await this.accountRepository.save(newAccount);
  }

  async findAllRegisteredAccount(): Promise<Account[]> {
    return await this.accountRepository.find();
  }

  async findOneRegisteredAccount(accountId: number): Promise<Account> {
    const account = await this.accountRepository.findOneBy({ accountId });
    if (!account) {
      throw new NotFoundException(`Account with ID ${accountId} not found`);
    }
    return account;
  }

  async updateAccount(
    id: number,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    const account = await this.accountRepository.preload({
      accountId: id,
      ...updateAccountDto,
    });
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    return this.accountRepository.save(account);
  }

  async removeAccount(accountId: number): Promise<void> {
    const result = await this.accountRepository.delete(accountId);
    if (result.affected === 0) {
      throw new NotFoundException(`Account with ID ${accountId} not found`);
    }
  }

  // dri ang mga uthentication...

  async authLogin(
    authLoginDto: AuthLoginDto,
  ): Promise<{ access_token: string }> {
    const { userName, password } = authLoginDto;
    const accounstData = await this.accountRepository.findOne({
      where: { userName },
    });
    if (!accounstData) {
      throw new NotFoundException(
        `Usernamme with username ${userName} not found`,
      );
    }

    const passwordMatches = await argon.verify(accounstData.hash, password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      userName: accounstData.userName,
      sub: accounstData.accountId,
    };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}
