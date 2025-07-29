import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtAccsesToken } from 'src/common/config/jwt/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }


    async canActivate(context: ExecutionContext,) {
        const request = context.switchToHttp().getRequest();
        let token = this.getToken(request);

        if (!token) throw new UnauthorizedException()

        try {
            let payload = await this.jwtService.verifyAsync(token, JwtAccsesToken)
            request['user'] = payload

            return true
        } catch (error) {
            console.log(2, error);

            if (error.name === 'TokenExpiredError') throw new UnauthorizedException('token expire !')
            throw new UnauthorizedException('Invalide token !')
        }
    }


    private getToken(request: Request): string | undefined {
        let [type, token] = request.headers.authorization?.split(" ") || []
        return type == "Bearer" ? token : undefined
    }
}