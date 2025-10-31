import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { SendEmailDto } from 'src/dtos/mailer/mailer.dto';
import { ISendMailOptions, MailerService as NestMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {

    constructor(
        private readonly mailerService: NestMailerService
    ) { }

    async sendEmail(sendEmailDto: SendEmailDto): Promise<void> {
        const from = {
            name: 'Casal que Cura',
            address: 'matheus.marcelo@aluno.faculdadeimpacta.com.br'
        };

        const options: ISendMailOptions = {
            from: sendEmailDto.from ?? from,
            to: sendEmailDto.recipients,
            subject: sendEmailDto.subject,
            html: sendEmailDto.html,
        }

        await this.mailerService.sendMail(options);
    }
}
