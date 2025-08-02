import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateEducationDto } from './dto/update.dto';
import { CreateEducationDto } from './dto/create.dto';
import { PrismaService } from 'src/Database/prisma.service';
import { isId } from 'src/common/utils/verify-id';


@Injectable()
export class EducationsService {
  constructor(private prisma: PrismaService) { }


  async findByUserId(userId: string) {
    if (isNaN(Number(userId))) {
      throw new BadRequestException({ success: false, message: 'Invalde ID !' })
    }
    const data = await this.prisma.education.findMany({ where: { userId: Number(userId) } });
    if (data.length === 0) {
      throw new NotFoundException({ success: false, message: 'not found !' })
    }

    return {
      success: true,
      message: 'success readedd !',
      data
    }
  }


  async findOne(id: string) {
    isId(id)
    const data = await this.prisma.education.findUnique({ where: { id: Number(id) } });
    if (!data) throw new NotFoundException({ success: false, message: 'Education not found' });
    return {
      success: true,
      message: 'success readedd !',
      data
    };
  }


  async create(dto: CreateEducationDto) {
    await this.prisma.education.create({ data: dto });
    return {
      success: true,
      message: 'success created !'
    }
  }


  async update(id: string, dto: UpdateEducationDto) {
    isId(id)
    await this.findOne(id);

    await this.prisma.education.update({
      where: { id: Number(id) },
      data: dto,
    });

    return {
      success: true,
      messgae: 'success updated !'
    }
  }


  async remove(id: string) {
    isId(id)
    await this.findOne(id);
    await this.prisma.education.delete({ where: { id: Number(id) } });

    return {
      success: true,
      messgae: 'success deleetd !'
    }
  }
}
