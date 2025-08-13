import { InvoicePaymentType } from '@core/entities/invoice';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';

class CardDto {
  @ApiProperty({
    description: 'The number of the card',
    example: '1234567890123456',
  })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({
    description: 'The cvv of the card',
    example: '123',
  })
  @IsString()
  @IsNotEmpty()
  cvv: string;

  @ApiProperty({
    description: 'The expiry month of the card',
    example: 12,
  })
  @IsNumber()
  @IsNotEmpty()
  expiryMonth: number;

  @ApiProperty({
    description: 'The expiry year of the card',
    example: 2025,
  })
  @IsNumber()
  @IsNotEmpty()
  expiryYear: number;

  @ApiProperty({
    description: 'The cardholder name of the card',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  cardholderName: string;

  @ApiProperty({
    description: 'The card last digits of the card',
    example: '1234',
  })
  @IsString()
  @IsNotEmpty()
  cardLastDigits: string;
}

export class CreateInvoiceDto {
  @ApiProperty({
    description: 'The amount of the invoice',
    example: 100,
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    description: 'The description of the invoice',
    example: 'Invoice for the month of August',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The payment type of the invoice',
    example: InvoicePaymentType.CREDIT_CARD,
  })
  @IsEnum(InvoicePaymentType)
  @IsNotEmpty()
  paymentType: InvoicePaymentType;

  @ApiProperty({
    description: 'The card last digits of the invoice',
    example: '1234',
  })
  @IsString()
  @IsNotEmpty()
  cardLastDigits: string;

  @ApiProperty({
    description: 'The card details of the invoice',
    example: {
      number: '1234567890123456',
      cvv: '123',
      expiryMonth: 12,
      expiryYear: 2025,
      cardholderName: 'John Doe',
      cardLastDigits: '1234',
    },
  })
  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  card: CardDto;
}
