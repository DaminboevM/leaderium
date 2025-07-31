import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsBoolean,
} from 'class-validator';

export class CreateExprinseDto {
  @ApiProperty({ example: 'Senior Backend Developer' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Google LLC' })
  @IsString()
  @IsNotEmpty()
  company: string;

  @ApiProperty({ example: 'California, USA', required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ example: '2022-01-01' })
  @IsDateString()
  startDate: Date;

  @ApiProperty({ example: '2024-01-01', required: false })
  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @ApiProperty({ example: false })
  @IsBoolean()
  current: boolean;

  @ApiProperty({ example: 'Backend architecture, microservices, Node.js' })
  @IsOptional()
  @IsString()
  description?: string;
}
