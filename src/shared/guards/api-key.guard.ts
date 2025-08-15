import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { FindByApiKeyAccountUseCase } from '@core/use-cases/user/find-by-api-key';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly findByApiKeyUseCase: FindByApiKeyAccountUseCase,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = this.extractApiKeyFromHeader(request);

    if (!apiKey) {
      throw new UnauthorizedException('API key is required');
    }

    const user = await this.findByApiKeyUseCase.execute({ apiKey });

    if (!user) {
      throw new UnauthorizedException('Invalid API key');
    }

    // Adiciona a conta ao request para uso posterior
    request['user'] = user;

    return true;
  }

  private extractApiKeyFromHeader(request: Request): string | undefined {
    const apiKey = request.headers['api-key'] as string;
    return apiKey;
  }
}
