import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compirePass, hashPassword } from 'src/common/config/bcrypt/bcrypt';
import { JwtPayload } from 'src/common/types/type';
import { RegisterDto } from './dto/register.dto';
import { RedisService } from 'src/common/config/redis/redis.service';
import { MailerService } from 'src/common/config/mailer/mailer.service';
import { LoginDto } from './dto/login.do';
import { VerificationDto } from './dto/verification.dto';
import { TokenDto } from './dto/token.dto';
import { SendVerifyDto } from './dto/send-veify.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { PrismaService } from 'src/Database/prisma.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly redisService: RedisService,
        private readonly mailerService: MailerService
    ) { }


    private async generateToken(payload: JwtPayload, AccsesTokenOnly = false) {
        const accessToken = await this.jwtService.signAsync(payload)
        if (AccsesTokenOnly) return { accessToken }

        const refreshToken = await this.jwtService.signAsync({ id: payload.id })
        return { accessToken, refreshToken }
    }


    async register(payload: RegisterDto) {
        if (await this.prisma.user.findUnique({ where: { email: payload.email } })) {
            throw new ConflictException({ success: false, message: 'email alredy exsists !' })
        }

        const code = Math.floor(100000 + Math.random() * 900000)
        this.mailerService.sendConfigurationMailer(payload.email, code)

        await this.redisService.set(`register: ${payload.email}`, JSON.stringify({ ...payload, code }), 600)

        return {
            success: true,
            message: `${payload.email}to send verification code !`
        }
    }


    async verification(payload: VerificationDto) {
        const data = await this.redisService.get(`register: ${payload.email}`)
        if (!data) throw new BadRequestException({ success: false, message: 'OTp expire ' })

        const user = JSON.parse(data)
        if (user.code != payload.code) throw new BadRequestException({ success: false, message: 'Otp Invalide !' })

        await this.redisService.del(`register: ${payload.email}`)
        delete user.code

        const hash = await hashPassword(user.password)
        const res = await this.prisma.user.create({ data: { ...user, password: hash } })

        return this.generateToken({ id: res.id, role: res.role }, false)
    }



    async login(payload: LoginDto) {
        const user = await this.prisma.user.findFirst({ where: { email: payload.email } })
        if (!user || !(await compirePass(payload.password, user.password || ''))) {
            throw new ConflictException({ success: false, message: 'Invalid username or password' })
        }

        return this.generateToken({ id: user.id, role: user.role }, false)
    }


    async refreshToken(token: TokenDto) {
        try {
            const data = await this.jwtService.verifyAsync(token.token);
            const user = await this.prisma.user.findUnique({ where: { id: data.id } });

            if (!user) { throw new NotFoundException({ success: false, message: 'Invalid JWT!' }) }

            return this.generateToken({ id: user.id, role: user.role }, true)
        } catch (error) {
            throw new UnauthorizedException({ success: false, message: 'Invalid or expired refresh token' })
        }
    }


    async sendverify(payload: SendVerifyDto) {
        const code = Math.floor(100000 + Math.random() * 900000)

        await this.mailerService.sendConfigurationMailer(payload.email, code)
        await this.redisService.set(`pass: ${payload.email}`, JSON.stringify({ ...payload, code }), 600)

        return { message: `${payload.email}to send verification code !` }
    }


    async resetPassword(payload: ResetPasswordDto) {
        const stored = await this.redisService.get(`pass: ${payload.email}`)
        if (!stored) throw new BadRequestException('Otp expire or invalid !')

        const user = JSON.parse(stored)
        if (user.code != payload.code) throw new BadRequestException('Otp invalide !!')

        await this.redisService.del(`pass: ${payload.email}`)
        const hash = await hashPassword(payload.password)
        await this.prisma.user.update({ where: { email: payload.email }, data: { password: hash } })

        return { success: true, message: 'Password succes updated' }
    }
    async googleCallback(user: {
    sub: string;
    email: string;
    name: string;
    picture?: string;
    accessToken: string;
    refreshToken?: string;
}) {
    const { sub: googleId, email, name, picture, accessToken, refreshToken } = user;

    if (!email) {
        throw new UnauthorizedException('Google profilida email yo‘q');
    }

    let userData = await this.prisma.user.findUnique({
        where: { email },
    });

    if (!userData) {
        userData = await this.prisma.user.create({
            data: {
                email,
                fullName: name,
                avatar: picture,
                password: null,
                phone: null,
                about: null,
                location: null,
                headline: null,
                website: null,
                role: 'USER',
            },
        });

        await this.prisma.oAuthAccount.create({
            data: {
                provider: 'google',
                providerUserId: googleId,
                userId: userData.id,
                accessToken,
                refreshToken,
            },
        });
    } else {
        const existingOAuth = await this.prisma.oAuthAccount.findFirst({
            where: {
                provider: 'google',
                providerUserId: googleId,
                userId: userData.id,
            },
        });

        if (!existingOAuth) {
            await this.prisma.oAuthAccount.create({
                data: {
                    provider: 'google',
                    providerUserId: googleId,
                    userId: userData.id,
                    accessToken,
                    refreshToken,
                },
            });
        } else {
            await this.prisma.oAuthAccount.update({
                where: {
                    provider_providerUserId: {
                        provider: 'google',
                        providerUserId: googleId,
                    },
                },
                data: {
                    accessToken,
                    refreshToken,
                },
            });
        }
    }

    const access_token = await this.jwtService.signAsync({
        userId: userData.id,
        role: userData.role,
    });

    const refresh_token = await this.jwtService.signAsync(
        {
            userId: userData.id,
            role: userData.role,
        },
        { expiresIn: '30d' }
    );

    const safeUser = {
        id: userData.id,
        fullName: userData.fullName,
        email: userData.email,
        avatar: userData.avatar,
        role: userData.role,
    };

    return {
        message: userData ? 'Login successful' : 'Registration successful',
        access_token,
        refresh_token,
        user: safeUser,
    };
}

}
