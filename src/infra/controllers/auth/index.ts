import { TokenAdapter } from '@core/adapters/token';
import { Inject, Injectable } from '@nestjs/common';
import { GetUserAuthStepUseCase } from '../get-user-auth-step';
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
  authStep: number;
  accessToken: string;
}

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptographyAdapter: CryptographyAdapter,
    @Inject(TOKEN_PROVIDERS['2FA_TOKEN_SERVICE'])
    private readonly tokenService: TokenAdapter,
    private readonly exception: ExceptionsAdapter,
    private readonly getUserAuthStepUseCase: GetUserAuthStepUseCase,
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

    const { authStep } = this.getUserAuthStepUseCase.execute({ user });

    const temporaryAccessToken = await this.tokenService.generateToken({
      id: user.id,
    });

    return {
      authStep,
      accessToken: temporaryAccessToken,
    };
  }
}
