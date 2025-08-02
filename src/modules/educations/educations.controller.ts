import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { EducationsService } from './educations.service';
import { CreateEducationDto } from './dto/create.dto';
import { UpdateEducationDto } from './dto/update.dto';
import { Education } from '@prisma/client';

@ApiTags('Educations')
@Controller('educations')
export class EducationsController {
  constructor(private readonly educationsService: EducationsService) {}

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all educations by user ID' })
  @ApiParam({ name: 'userId', type: String, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'List of educations', type: [CreateEducationDto] })
  findByUserId(@Param('userId') userId: string) {
    return this.educationsService.findByUserId(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get education by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Education ID' })
  @ApiResponse({ status: 200, description: 'Education found', type: CreateEducationDto })
  findOne(@Param('id') id: string) {
    return this.educationsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new education' })
  @ApiResponse({ status: 201, description: 'Education created', type: CreateEducationDto })
  create(@Body() dto: CreateEducationDto) {
    return this.educationsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update education by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Education ID' })
  @ApiResponse({ status: 200, description: 'Education updated', type: UpdateEducationDto })
  update(@Param('id') id: string, @Body() payload: UpdateEducationDto) {
    return this.educationsService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete education by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Education ID' })
  @ApiResponse({ status: 200, description: 'Education deleted' })
  remove(@Param('id') id: string) {
    return this.educationsService.remove(id);
  }
}
