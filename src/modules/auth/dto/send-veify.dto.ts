import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class SendVerifyDto {

    @ApiProperty({example: 'm707rizo@gmail.com'})
    @IsNotEmpty()
    @IsEmail()
    email: string
}