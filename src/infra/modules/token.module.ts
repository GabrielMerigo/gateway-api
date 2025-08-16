import { JwtIntegration } from '@infra/jwt';
import { Global, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { env } from 'process';

export const TOKEN_PROVIDERS = {
  TOKEN_SERVICE: Symbol('TOKEN_SERVICE'),
  REFRESH_TOKEN_SERVICE: Symbol('REFRESH_TOKEN_SERVICE'),
  '2FA_TOKEN_SERVICE': Symbol('2FA_TOKEN_SERVICE'),
};

@Global()
@Module({
  imports: [JwtModule.register({})],
  providers: [
    {
      provide: TOKEN_PROVIDERS.TOKEN_SERVICE,
      useFactory: (jwtService: JwtService) =>
        new JwtIntegration(env.JWT_SECRET!, '15m', jwtService),
      inject: [JwtService],
    },
    {
      provide: TOKEN_PROVIDERS.REFRESH_TOKEN_SERVICE,
      useFactory: (jwtService: JwtService) =>
        new JwtIntegration(env.JWT_REFRESH_SECRET!, '15d', jwtService),
      inject: [JwtService],
    },
    {
      provide: TOKEN_PROVIDERS['2FA_TOKEN_SERVICE'],
      useFactory: (jwtService: JwtService) =>
        new JwtIntegration(env.JWT_2FA_SECRET!, '15m', jwtService),
      inject: [JwtService],
    },
  ],
  exports: [
    TOKEN_PROVIDERS.TOKEN_SERVICE,
    TOKEN_PROVIDERS.REFRESH_TOKEN_SERVICE,
    TOKEN_PROVIDERS['2FA_TOKEN_SERVICE'],
  ],
})
export class TokenModule {}
