import { Body, Controller, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.do';
import { VerificationDto } from './dto/verification.dto';
import { TokenDto } from './dto/token.dto';
import { SendVerifyDto } from './dto/send-veify.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @Post('register')
    @ApiOperation({ summary: 'User register qilish' })
    @ApiBody({ type: RegisterDto })
    register(@Body() payload: RegisterDto) {
        return this.authService.register(payload);
    }


    @Post('verification')
    @ApiOperation({ summary: 'emailga borgan kodni tasdiqlash register qilganda' })
    @ApiBody({ type: VerificationDto })
    verification(@Body() payload: VerificationDto) {
        return this.authService.verification(payload);
    }


    @Post('login')
    @ApiOperation({ summary: 'login qilish' })
    @ApiBody({ type: LoginDto })
    login(@Body() payload: LoginDto) {
        return this.authService.login(payload);
    }


    @Post('refresh-token')
    @ApiOperation({ summary: 'accesstokenni yangilash' })
    @ApiBody({ type: TokenDto })
    refreshToken(@Body() token: TokenDto) {
        return this.authService.refreshToken(token);
    }


    @Post('send-verify')
    @ApiOperation({ summary: 'emailga kod yuborish' })
    @ApiBody({ type: SendVerifyDto })
    sendverify(@Body() payload: SendVerifyDto) {
        return this.authService.sendverify(payload);
    }


    @Put('reset-password')
    @ApiOperation({ summary: 'parolni almashtrish' })
    @ApiBody({ type: ResetPasswordDto })
    resetPassword(@Body() payload: ResetPasswordDto) {
        return this.authService.resetPassword(payload);
    }
}
