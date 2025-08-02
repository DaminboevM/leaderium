import { IsOptional, IsString, IsDateString, IsInt } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEducationDto {
  @ApiPropertyOptional({ example: 1, description: 'The ID of the user who owns this education entry' })
  @IsOptional()
  @IsInt()
  userId?: number;

  @ApiPropertyOptional({ example: 'MIT', description: 'The name of the school' })
  @IsOptional()
  @IsString()
  school?: string;

  @ApiPropertyOptional({ example: 'Master of Science', description: 'The degree obtained' })
  @IsOptional()
  @IsString()
  degree?: string;

  @ApiPropertyOptional({ example: 'Software Engineering', description: 'Field of study' })
  @IsOptional()
  @IsString()
  field?: string;

  @ApiPropertyOptional({ example: '2021-09-01', description: 'Start date in ISO format' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ example: '2023-06-01', description: 'End date in ISO format (optional)' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ example: 'Focused on AI and machine learning', description: 'Additional description (optional)' })
  @IsOptional()
  @IsString()
  description?: string;
}
