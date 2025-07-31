import { Controller, Post, Get, Delete, Patch, Query, Body, Param } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { GetSkillsQueryDto } from './dto/get-skills-query.dto';
import { CreateSkillDto } from './dto/create-skills.dto';
import { UpdateSkillDto } from './dto/update-skills.dto';

@Controller('skills')
export class SkillsController {
    constructor(private readonly skillsService: SkillsService) { }


    @Get()
    getAll(@Query() query: GetSkillsQueryDto) {
        return this.skillsService.getAll(query);
    }


    @Get('user/:userId')
    getByUserId(@Param('userId') userId: string ) {
        return this.skillsService.getByUserId(userId);
    }


    @Post('create')
    create(@Body() payload: CreateSkillDto) {
        return this.skillsService.create(payload);
    }


    @Patch('update/:id')
    update(@Param('id') id: string, @Body() payload: UpdateSkillDto) {
        return this.skillsService.update(id, payload);
    }


    @Delete('delete/:id')
    delete(@Param('id') id: string) {
        return this.skillsService.delete(id);
    }
}
