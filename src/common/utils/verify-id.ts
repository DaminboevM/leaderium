import { BadRequestException } from "@nestjs/common"

export const isId = (id: string) =>  {
    if (isNaN(Number(id))) {
      throw new BadRequestException({
        success: false,
        message: 'Invalide Id'
      })
    }
    return true
  }