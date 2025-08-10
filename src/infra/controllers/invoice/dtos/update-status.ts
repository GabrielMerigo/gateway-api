import { InvoiceStatus } from '@core/entities/invoice';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateInvoiceStatusDto {
  @ApiProperty({
    description: 'The status of the invoice',
    example: InvoiceStatus.PENDING,
  })
  @IsEnum(InvoiceStatus)
  @IsNotEmpty()
  status: InvoiceStatus;
}
