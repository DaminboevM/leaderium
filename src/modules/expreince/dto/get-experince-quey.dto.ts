import { IsInt, IsOptional, IsString } from 'class-validator';

export class GetExperienceQueryDto {
  @IsOptional()
  @IsInt()
  limit?: number;

  @IsOptional()
  @IsInt()
  offset?: number;

  @IsOptional()
  @IsString()
  search?: string;
}
