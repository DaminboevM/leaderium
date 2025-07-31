import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { GetExperienceQueryDto } from './dto/get-experince-quey.dto';
import { CreateExperienceDto } from './dto/create-experince.dto';
import { UpdateExperienceDto } from './dto/update-experince.dto';
import { ExpreinceService } from './expreince.service';


@Controller('experience')
export class ExpreienceController {
  constructor(private readonly experienceService: ExpreinceService) {}

  @Get()
  getAll(@Query() query: GetExperienceQueryDto) {
    return this.experienceService.getAll(query);
  }

  @Get('user/:userId')
  getByUserId(@Param('userId') userId: string) {
    return this.experienceService.getByUserId(userId);
  }

  @Post('create')
  create(@Body() dto: CreateExperienceDto) {
    return this.experienceService.create(dto);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateExperienceDto) {
    return this.experienceService.update(id, dto);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.experienceService.delete(id);
  }
}
