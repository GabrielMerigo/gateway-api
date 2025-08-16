import {
  GetPayloadFromTokenOutput,
  TokenAdapter,
  TokenPayload,
} from '@core/adapters/token';
import { Injectable } from '@nestjs/common';
import { JwtService as JWT } from '@nestjs/jwt';

export interface TokenOptions {
  issuer: string;
  secret: string;
  expiresIn?: number | string;
}

@Injectable()
export class JwtIntegration implements TokenAdapter {
  private readonly ISSUER = 'merigos-pay-login';

  constructor(
    private readonly secret: string,
    private readonly expiresIn: string,
    private jwt: JWT,
  ) {}

  async generateToken(
    payload: TokenPayload,
    expiresAt?: Date,
  ): Promise<string> {
    const options: TokenOptions = {
      issuer: this.ISSUER,
      secret: this.secret,
      expiresIn: this.expiresIn,
    };

    if (expiresAt) {
      options.expiresIn = this.#calculateSecondsUntil(expiresAt);
    }

    return this.jwt.signAsync(payload, options);
  }

  async getPayloadFromToken(token: string): Promise<GetPayloadFromTokenOutput> {
    const payload = await this.jwt.verifyAsync<GetPayloadFromTokenOutput>(
      token,
      {
        secret: this.secret,
      },
    );

    return payload;
  }

  #calculateSecondsUntil(date: Date): number {
    const now = new Date();
    return Math.floor((date.getTime() - now.getTime()) / 1000);
  }
}
