import { JwtSignOptions } from '@nestjs/jwt'

export const JwtAccsesToken: JwtSignOptions = {
    secret: 'salomqwerty',
    expiresIn: '100m'
}

export const JwtRefreshToken: JwtSignOptions = {
    secret: 'salomqwerty',
    expiresIn: '30h'
}