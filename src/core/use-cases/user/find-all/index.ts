import { Injectable } from '@nestjs/common';
import { UserRepository } from '@core/repositories/user';
import { User } from '@core/entities/user';

@Injectable()
export class FindAllAccountsUseCase {
  constructor(private readonly accountRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.accountRepository.findAll();
  }
}
