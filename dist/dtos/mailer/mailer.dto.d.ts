import { Address } from "nodemailer/lib/mailer";
export declare class SendEmailDto {
    from?: Address;
    recipients: Address[];
    subject: string;
    html: string;
    text?: string;
}
