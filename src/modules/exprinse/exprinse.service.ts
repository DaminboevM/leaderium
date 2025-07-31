import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { CreateExprinseDto } from './dto/create-exprinse.dto';
import { UpdateExprinseDto } from './dto/update-exprinse.dto';

@Injectable()
export class ExprinseService {
  constructor(private readonly prisma: PrismaService) { }

  async create(userId: number, dto: CreateExprinseDto) {
    try {
      return await this.prisma.experience.create({
        data: {
          userId,
          ...dto,
        },
      });
    } catch (err) {
      throw new BadRequestException('Tajriba yaratib bo‘lmadi');
    }
  }

  async findAll(userId: number) {
    const existsUser = await this.prisma.user.findUnique({ where: { id: userId } })
    if (existsUser) throw new NotFoundException('user not found')
    return this.prisma.experience.findMany({
      where: { userId },
      orderBy: { startDate: 'desc' },
    });
  }

  async findOne(userId: number, id: number) {
    const existsUser = await this.prisma.user.findUnique({ where: { id: userId } })
    if (existsUser) throw new NotFoundException('user not found')

    const experience = await this.prisma.experience.findUnique({ where: { id } });
    if (!experience || experience.userId !== userId)
      throw new ForbiddenException('Bu tajriba sizga tegishli emas');

    return experience;
  }

  async update(userId: number, id: number, dto: UpdateExprinseDto) {
    const existsUser = await this.prisma.user.findUnique({ where: { id: userId } })
    if (existsUser) throw new NotFoundException('user not found')

    const experience = await this.prisma.experience.findUnique({ where: { id } });

    if (!experience || experience.userId !== userId)
      throw new ForbiddenException('Bu tajriba sizga tegishli emas');
    return this.prisma.experience.update({
      where: { id },
      data: dto,
    });
  }

  async remove(userId: number, id: number) {
    const existsUser = await this.prisma.user.findUnique({ where: { id: userId } })
    if (existsUser) throw new NotFoundException('user not found')

    const experience = await this.prisma.experience.findUnique({ where: { id } });
    if (!experience || experience.userId !== userId)
      throw new ForbiddenException('Bu tajriba sizga tegishli emas');

    return this.prisma.experience.delete({ where: { id } });
  }
}


