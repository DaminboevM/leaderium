import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { UpdateExperienceDto, UpdateUserDto } from './dto/update.dto';
import { CreateExperienceDto, CreateSkillDto, CreateUserDto } from './dto/create.dto';
import { Role } from '@prisma/client';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }
    async getAllUser(
        page: number = 1,
        limit: number = 8,
        isActive?: boolean,
        role?: Role,
        search?: string
    ) {
        const where: any = {
            role: Role.USER

        };

        if (isActive !== undefined) where.isActive = isActive;
        if (role) where.role = role;
        if (search) {
            where.OR = [
                { fullName: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search, mode: 'insensitive' } },
            ];
        }

        const [users, total] = await this.prisma.$transaction([
            this.prisma.user.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                select: {
                    id: true,
                    fullName: true,
                    avatar: true,
                    email: true,
                    phone: true,
                    role: true,
                    createdAt: true,
                }
            }),
            this.prisma.user.count({ where })
        ]);

        return { data: users, count: total, page, limit };
    }
    async getUserById(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                fullName: true,
                email: true,
                phone: true,
                role: true,
                createdAt: true,
                about: true,
                avatar: true,
                experiences: true,
                educations: true,
                jobs: true,
                skills: true,
                website: true
            }
        });

        if (!user) {
            throw new NotFoundException('User topilmadi');
        }

        return { data: user };
    }
    async getUserMe(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                fullName: true,
                email: true,
                phone: true,
                role: true,
                createdAt: true,
                about: true,
                avatar: true,
                experiences: true,
                educations: true,
                jobs: true,
                skills: true,
                website: true
            }
        });

        if (!user) {
            throw new NotFoundException('User topilmadi');
        }

        return { data: user };
    }

    async createUser(payload: CreateUserDto) {
        const existsEmail = await this.prisma.user.findUnique({ where: { email: payload.email } })
        if (existsEmail) throw new ConflictException('this email already exists')
        const hashPassword = await hash(payload.password!, 10)
        const createUser = await this.prisma.user.create({
            data: {
                email: payload.email,
                fullName: payload.fullName,
                about: payload.about,
                password: hashPassword,
                headline: payload.headline,
                location: payload.location,
                website: payload.website,
                phone: payload.phone
            }
        })
        const { password, ...safeUser } = createUser
        return {
            success: true,
            data: safeUser
        }
    }
    async deleteUser(userId: number) {
        const existsUser = await this.prisma.user.findUnique({ where: { id: userId } })
        if (!existsUser) throw new NotFoundException('user not found!')
        await this.prisma.user.delete({ where: { id: userId } })
        return {
            success: true,
            message: "successfully deleted!"
        }
    }


}
