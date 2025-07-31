import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { GetExperienceQueryDto } from './dto/get-experince-quey.dto';
import { CreateExperienceDto } from './dto/create-experince.dto';
import { UpdateExperienceDto } from './dto/update-experince.dto';


@Injectable()
export class ExpreinceService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(query: GetExperienceQueryDto) {
    const take = query.limit ?? 10;
    const skip = query.offset ? (query.offset - 1) * take : 0;

    const where: any = query.search
      ? {
          OR: [
            { title: { contains: query.search, mode: 'insensitive' } },
            { company: { contains: query.search, mode: 'insensitive' } },
          ],
        } : {};

    const [items, total] = await this.prisma.$transaction([
      this.prisma.experience.findMany({
        where,
        skip,
        take,
        orderBy: { id: 'desc' },
      }),
      this.prisma.experience.count({ where }),
    ]);

    return {
      total,
      data: items,
    };
  }

  async getByUserId(userId: string) {
    const id = Number(userId);
    if (isNaN(id)) {
      throw new BadRequestException('Invalid user id');
    }
    if(!await this.prisma.user.findUnique({where: {id} })) {
      throw new NotFoundException({success: false, message: 'user not found !'})
    }

    const data = await this.prisma.experience.findMany({
      where: { userId: id },
      orderBy: { id: 'desc' },
    });

    return {
        success: true,
        data
    }
  }



  async create(payload: CreateExperienceDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.experience.create({ data: payload });
    return {
      success: true,
      message: 'Experience success created !',
    };
  }

  async update(id: string, payload: UpdateExperienceDto) {
    const experienceId = Number(id);
    if (isNaN(experienceId)) {
      throw new BadRequestException('Invalid experience id');
    }

    const experience = await this.prisma.experience.findUnique({
      where: { id: experienceId },
    });
    if (!experience) {
      throw new NotFoundException('Experience not found');
    }

    await this.prisma.experience.update({
      where: { id: experienceId },
      data: payload,
    });

    return {
        success: true,
        message: 'experinces success updated !'
    }
  }



  async delete(id: string) {
    const experienceId = Number(id);
    if (isNaN(experienceId)) {
      throw new BadRequestException('Invalid experience id');
    }

    const experience = await this.prisma.experience.findUnique({
      where: { id: experienceId },
    });
    if (!experience) {
      throw new NotFoundException('Experience not found');
    }

    await this.prisma.experience.delete({
      where: { id: experienceId },
    });

    return {
      success: true,
      message: 'Experience success deleted !',
    };
  }
}
