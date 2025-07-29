import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsJWT } from 'class-validator';

export class TokenDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk5OTk5OTk5fQ.sF5o6O1KzY8GZyUK3D92F4egbR8wzBcA8bU0JzkL-uM' })
  @IsJWT()
  @IsNotEmpty()
  token: string;
}
