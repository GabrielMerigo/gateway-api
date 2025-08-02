import { ExceptionCode } from './exceptions';

export interface ExceptionParams {
  message: string;
  code: ExceptionCode;
}

export abstract class ExceptionsAdapter {
  abstract badRequest(data: ExceptionParams): void;
  abstract conflict(data: ExceptionParams): void;
  abstract internalServerError(data?: ExceptionParams): void;
  abstract forbidden(data?: ExceptionParams): void;
  abstract unauthorized(data?: ExceptionParams): void;
  abstract notFound(data?: ExceptionParams): void;
  abstract wrongCredentials(): void;
}
