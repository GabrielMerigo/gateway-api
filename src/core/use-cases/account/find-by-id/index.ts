import { AccountRepository } from '@core/repositories/account';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindByIdAccountUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(id: string) {
    return this.accountRepository.findById(id);
  }
}
