import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { ExprinseService } from './exprinse.service';
import { CreateExprinseDto } from './dto/create-exprinse.dto';
import { UpdateExprinseDto } from './dto/update-exprinse.dto';
import { AuthGuard } from 'src/core/guard/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Experiences')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('experiences')
export class ExprinseController {
  constructor(private readonly exprinseService: ExprinseService) { }

  @Post()
  @ApiOperation({ summary: 'Add new experience' })
  @ApiResponse({ status: 201, description: 'Experience created successfully' })
  create(@Req() req: Request, @Body() dto: CreateExprinseDto) {
    const userId = req['user'].id;
    return this.exprinseService.create(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get current user experiences' })
  @ApiResponse({ status: 200, description: 'List of experiences' })
  findAll(@Req() req: Request) {
    const userId = req['user'].id;
    return this.exprinseService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one experience by ID' })
  @ApiResponse({ status: 200, description: 'Experience found' })
  findOne(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const userId = req['user'].id;
    return this.exprinseService.findOne(userId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update experience by ID' })
  @ApiResponse({ status: 200, description: 'Experience updated successfully' })
  update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateExprinseDto,
  ) {
    const userId = req['user'].id;
    return this.exprinseService.update(userId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete experience by ID' })
  @ApiResponse({ status: 200, description: 'Experience deleted successfully' })
  remove(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    const userId = req['user'].id;
    return this.exprinseService.remove(userId, id);
  }
}
