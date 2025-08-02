import { ExceptionsAdapter } from '@core/adapters';
import { ExceptionsIntegration } from '@infra/integrations/exceptions';
import { Module } from '@nestjs/common';

@Module({
  providers: [{ provide: ExceptionsAdapter, useClass: ExceptionsIntegration }],
  exports: [ExceptionsAdapter],
})
export class ExceptionsModule {}
