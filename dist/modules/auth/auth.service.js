"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const DITokens_enum_1 = require("../../constants/enums/DITokens/DITokens.enum");
const bcrypt_1 = require("bcrypt");
const mailer_service_1 = require("../mailer/mailer.service");
const reset_password_email_1 = __importDefault(require("../../templates/reset_password.email"));
let AuthService = class AuthService {
    customerService;
    resetPasswordRepository;
    jwtService;
    configService;
    mailerService;
    constructor(customerService, resetPasswordRepository, jwtService, configService, mailerService) {
        this.customerService = customerService;
        this.resetPasswordRepository = resetPasswordRepository;
        this.jwtService = jwtService;
        this.configService = configService;
        this.mailerService = mailerService;
    }
    async signIn(auth) {
        const customer = await this.customerService.getCustomerByEmail(auth.username);
        if (!(0, bcrypt_1.compareSync)(auth.password, customer.password)) {
            throw new common_1.UnauthorizedException();
        }
        const payload = { sub: customer.id, username: customer.email, role: customer.role };
        const token = this.jwtService.sign(payload);
        return {
            access_token: token,
            user_role: customer.role,
            expiresIn: +this.configService.get('JWT_EXPIRATION_TIME'),
        };
    }
    async recoverPassword(email, ipAddress) {
        const customer = await this.customerService.getCustomerByEmail(email);
        if (!customer) {
            throw new common_1.HttpException('Customer not found', common_1.HttpStatus.NOT_FOUND);
        }
        const token = this.generateToken();
        const sendEmail = {
            from: {
                name: this.configService.get('APP_NAME'),
                address: this.configService.get('MAIL_FROM')
            },
            recipients: [
                { name: customer.name, address: email }
            ],
            subject: 'Utilize o código para redefinir sua senha',
            html: (0, reset_password_email_1.default)(customer.name.split(' ')[0], token),
        };
        const resetPassword = {
            token: `${token}`,
            ipAddress,
            validated: false,
        };
        await this.resetPasswordRepository.createRecoverPasswordAsync(resetPassword);
        return await this.mailerService.sendEmail(sendEmail);
    }
    async validateTokenAsync(token, ipAddress) {
        const tokenFound = await this.resetPasswordRepository.getRecoverPasswordAsync(token, ipAddress);
        if (!tokenFound) {
            throw new common_1.HttpException('Invalid token or the user is not the same person who requested the password recovery.', common_1.HttpStatus.UNAUTHORIZED);
        }
        if (tokenFound.validated) {
            throw new common_1.HttpException('Token has already been used', common_1.HttpStatus.BAD_REQUEST);
        }
        if (new Date() > tokenFound.expiresIn) {
            throw new common_1.HttpException('Token has expired', common_1.HttpStatus.GONE);
        }
        await this.resetPasswordRepository.validateTokenAsync(tokenFound.id);
    }
    async resetPasswordAsync(resetPassword) {
        const customer = await this.customerService.getCustomerByEmail(resetPassword.email);
        if (!customer) {
            throw new common_1.HttpException('Customer not found', common_1.HttpStatus.NOT_FOUND);
        }
        const samePassword = (0, bcrypt_1.compareSync)(resetPassword.password, customer.password);
        if (samePassword) {
            throw new common_1.HttpException('This password is already in use', common_1.HttpStatus.BAD_REQUEST);
        }
        const saltOrRounds = 12;
        customer.password = (0, bcrypt_1.hashSync)(customer.password, saltOrRounds);
        await this.customerService.updateCustomerAsync(customer.id, customer);
    }
    generateToken() {
        return Math.floor(100000 + Math.random() * 900000);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(DITokens_enum_1.DITokensService.CUSTOMER_SERVICE)),
    __param(1, (0, common_1.Inject)(DITokens_enum_1.DITokensRepository.RESET_PASSWORD_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, jwt_1.JwtService,
        config_1.ConfigService,
        mailer_service_1.MailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map