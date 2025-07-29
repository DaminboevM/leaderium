import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
    constructor(private readonly mailerService: NestMailerService) {}


    async sendConfigurationMailer (email: string, code: number) {
        await this.mailerService.sendMail({
            to: email,
            template: 'index',
            context: {
                code
            }
        })
    }
}