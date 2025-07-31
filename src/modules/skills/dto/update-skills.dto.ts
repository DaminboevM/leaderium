// skills/dto/update-skill.dto.ts
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateSkillDto {
  @IsOptional()
  @IsString()
  name?: string;

}
