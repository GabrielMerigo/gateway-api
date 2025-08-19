import { Injectable } from '@nestjs/common';
import { UserRepository } from '@core/repositories/user';
import { User } from '@core/entities/user';
import { ErrorMessages, ExceptionCode } from '@core/adapters/exceptions';
import { ExceptionsAdapter } from '@core/adapters';
import { CryptographyAdapter } from '@core/adapters/cryptography';

interface CreateAccountParams {
  name: string;
  email: string;
  apiKey: string;
  balance: number;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly exception: ExceptionsAdapter,
    private readonly cryptography: CryptographyAdapter,
  ) {}

  async execute(data: CreateAccountParams): Promise<User | void> {
    const accountExists = await this.userRepository.findByEmail(data.email);

    if (accountExists) {
      return this.exception.conflict({
        message: ErrorMessages[ExceptionCode.ACCOUNT_ALREADY_EXISTS],
        code: ExceptionCode.ACCOUNT_ALREADY_EXISTS,
      });
    }

    const accountExistsByApiKey = await this.userRepository.findByApiKey(
      data.apiKey,
    );

    if (accountExistsByApiKey) {
      return this.exception.conflict({
        message: ErrorMessages[ExceptionCode.DUPLICATED_API_KEY],
        code: ExceptionCode.DUPLICATED_API_KEY,
      });
    }

    return await this.userRepository.create({
      name: data.name,
      email: data.email,
      apiKey: data.apiKey,
      balance: data.balance,
      password: await this.cryptography.generateHash(data.password),
      isTotpEnabled: false,
    });
  }
}
