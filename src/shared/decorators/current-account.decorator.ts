import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Account } from '@core/entities/account';

export const CurrentAccount = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Account => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { account: Account }>();

    return request.account as unknown as Account;
  },
);
