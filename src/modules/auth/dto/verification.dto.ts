import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNumber } from 'class-validator'


export class VerificationDto {

    @ApiProperty({example: 'm701rizo@gmail.com'})
    @IsEmail()
    email: string

    @ApiProperty({example: '123456'})
    @IsNumber()
    code: number
}