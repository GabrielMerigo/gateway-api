import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'The API key of the user',
    example: '1234567890',
  })
  @IsNotEmpty()
  @IsString()
  apiKey: string;

  @ApiProperty({
    description: 'The balance of the user',
    example: 100,
  })
  @IsNotEmpty()
  @IsInt()
  balance: number;

  @ApiProperty({
    description: 'The password of the user',
    example: '1234567890',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
