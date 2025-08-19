export interface TokenPayload {
  id: string;
  type: 'TEMPORARY' | 'PERMANENT';
}

export interface GetPayloadFromTokenOutput {
  id: string;
  exp: number;
}

export interface RefreshAccessReturn {
  accessToken: string;
}

export abstract class TokenAdapter {
  abstract getPayloadFromToken(
    token: string,
  ): Promise<GetPayloadFromTokenOutput>;
  abstract generateToken(
    payload: TokenPayload,
    expiresAt?: Date,
  ): Promise<string>;
}
