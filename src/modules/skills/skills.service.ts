import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { GetSkillsQueryDto } from './dto/get-skills-query.dto';
import { PrismaService } from 'src/Database/prisma.service';
import { CreateSkillDto } from './dto/create-skills.dto';
import { UpdateSkillDto } from './dto/update-skills.dto';

@Injectable()
export class SkillsService {
    constructor(private readonly prisma: PrismaService) { }


    async getAll(query: GetSkillsQueryDto) {
        const take = query.limit ?? 10
        const skip = query.offset ? (query.offset - 1) * take : 0

        const where: any = query.search ? {
            name: {
                contains: query.search,
                mode: 'insensitive',
            },
        }
            : {};

        const [items, total] = await this.prisma.$transaction([
            this.prisma.skill.findMany({
                where,
                skip,
                take,
                orderBy: { id: 'desc' },
            }),
            this.prisma.skill.count({ where }),
        ])

        return {
            total,
            data: items
        }
    }


    
    async getByUserId(userId: string) {
        if (isNaN(Number(userId))) {
            throw new BadRequestException({ success: false, message: 'Invalide id' })
        }
        return this.prisma.skill.findMany({
            where: { userId: Number(userId) },
            orderBy: { id: 'desc' },
        });
    }



    async create(payload: CreateSkillDto) {
        if (!await this.prisma.user.findFirst({ where: { id: payload.userId } })) {
            throw new NotFoundException({ success: false, message: 'user not found !' })
        }

        await this.prisma.skill.create({ data: payload });
        return {
            success: true,
            message: 'skills success created !'
        }
    }



    async update(id: string, payload: UpdateSkillDto) {
        if (isNaN(Number(id))) {
            throw new BadRequestException({ success: false, message: 'Invalide id' })
        }
        const skill = await this.prisma.skill.findUnique({ where: { id: Number(id) } });
        if (!skill) {
            throw new NotFoundException('Skill not found');
        }

        return this.prisma.skill.update({
            where: { id: Number(id) },
            data: payload,
        });
    }



    async delete(id: string) {
        if (isNaN(Number(id))) {
            throw new BadRequestException({ success: false, message: 'Invalide id' })
        }
        const skill = await this.prisma.skill.findUnique({ where: { id: Number(id) } });
        if (!skill) {
            throw new NotFoundException('Skill not found');
        }

        return this.prisma.skill.delete({ where: { id: Number(id) } });
    }
}
