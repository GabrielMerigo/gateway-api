import { Injectable } from '@nestjs/common';
import { AccountRepository } from '@core/repositories/account-repository';
import { Account } from '@core/entities/account-entity';

@Injectable()
export class FindAllAccountsUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(): Promise<Account[]> {
    return await this.accountRepository.findAll();
  }
}
