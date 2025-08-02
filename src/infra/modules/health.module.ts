import { Module } from '@nestjs/common';
import { HealthController } from '@infra/controllers/health';

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
