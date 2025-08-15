import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@core/entities/user';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest<Request & { user: User }>();

    return request.user as unknown as User;
  },
);
