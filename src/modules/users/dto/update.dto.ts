import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create.dto';
import { CreateExperienceDto } from './create.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) { }

export class UpdateExperienceDto extends PartialType(CreateExperienceDto) { }
