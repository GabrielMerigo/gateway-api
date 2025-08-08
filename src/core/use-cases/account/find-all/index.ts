import { Injectable } from '@nestjs/common';
import { AccountRepository } from '@core/repositories/account';
import { Account } from '@core/entities/account';

@Injectable()
export class FindAllAccountsUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(): Promise<Account[]> {
    return await this.accountRepository.findAll();
  }
}
