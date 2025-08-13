import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiKeyGuard } from '../guards/api-key.guard';
import { ApiSecurity } from '@nestjs/swagger';

export const REQUIRE_API_KEY = 'requireApiKey';

export const RequireApiKey = () =>
  applyDecorators(
    SetMetadata(REQUIRE_API_KEY, true),
    UseGuards(ApiKeyGuard),
    ApiSecurity('api-key', ['api-key']),
  );
