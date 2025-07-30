import { PartialType } from '@nestjs/swagger';
import { CreateExprinseDto } from './create-exprinse.dto';

export class UpdateExprinseDto extends PartialType(CreateExprinseDto) {}
