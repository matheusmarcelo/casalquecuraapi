import { SendEmailDto } from 'src/dtos/mailer/mailer.dto';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
export declare class MailerService {
    private readonly mailerService;
    constructor(mailerService: NestMailerService);
    sendEmail(sendEmailDto: SendEmailDto): Promise<void>;
}
