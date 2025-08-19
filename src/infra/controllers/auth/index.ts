import { TokenAdapter } from '@core/adapters/token';
import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '@core/repositories/user';
import { ExceptionsAdapter } from '@core/adapters';
import { ErrorMessages, ExceptionCode } from '@core/adapters/exceptions';
import { CryptographyAdapter } from '@core/adapters/cryptography';
import { TOKEN_PROVIDERS } from '@infra/modules/token.module';

interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptographyAdapter: CryptographyAdapter,
    @Inject(TOKEN_PROVIDERS.TOKEN_SERVICE)
    private readonly tokenService: TokenAdapter,
    @Inject(TOKEN_PROVIDERS['2FA_TOKEN_SERVICE'])
    private readonly twoFactorTokenService: TokenAdapter,
    private readonly exception: ExceptionsAdapter,
  ) {}

  async execute({
    email,
    password,
  }: LoginParams): Promise<LoginResponse | void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      this.exception.unauthorized({
        message: ErrorMessages[ExceptionCode.CREDENTIALS_INVALID],
        code: ExceptionCode.CREDENTIALS_INVALID,
      });
      return;
    }

    const isPasswordValid = await this.cryptographyAdapter.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      this.exception.unauthorized({
        message: ErrorMessages[ExceptionCode.CREDENTIALS_INVALID],
        code: ExceptionCode.CREDENTIALS_INVALID,
      });
      return;
    }

    let accessToken: string;

    if (user.isTotpEnabled) {
      accessToken = await this.twoFactorTokenService.generateToken({
        id: user.id,
        type: 'TEMPORARY',
      });
    } else {
      accessToken = await this.tokenService.generateToken({
        id: user.id,
        type: 'PERMANENT',
      });
    }

    return {
      accessToken,
    };
  }
}
