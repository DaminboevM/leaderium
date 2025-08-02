import { IsString, IsNotEmpty, IsOptional, IsDateString, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEducationDto {
  @ApiProperty({ example: 'Harvard University', description: 'The name of the school' })
  @IsNotEmpty()
  @IsString()
  school: string;

  @ApiProperty({ example: 'Bachelor of Science', description: 'The degree obtained' })
  @IsNotEmpty()
  @IsString()
  degree: string;

  @ApiProperty({ example: 'Computer Science', description: 'Field of study' })
  @IsNotEmpty()
  @IsString()
  field: string;

  @ApiProperty({ example: '2020-09-01', description: 'Start date in ISO format' })
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiPropertyOptional({ example: '2024-06-01', description: 'End date in ISO format (optional)' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ example: 'Studied algorithms and data structures', description: 'Additional notes or description (optional)' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1, description: 'The ID of the user who owns this education entry' })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
