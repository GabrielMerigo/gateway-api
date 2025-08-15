import { Injectable } from '@nestjs/common';
import { User } from '@core/entities/user';
import { UserRepository } from '@core/repositories/user';

interface FindByApiKeyParams {
  apiKey: string;
}

@Injectable()
export class FindByApiKeyAccountUseCase {
  constructor(private readonly accountRepository: UserRepository) {}

  async execute(data: FindByApiKeyParams): Promise<User | null> {
    return await this.accountRepository.findByApiKey(data.apiKey);
  }
}
