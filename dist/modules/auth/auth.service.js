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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const DITokens_enum_1 = require("../../constants/enums/DITokens/DITokens.enum");
const bcrypt_1 = require("bcrypt");
const mailer_service_1 = require("../mailer/mailer.service");
let AuthService = class AuthService {
    customerService;
    jwtService;
    configService;
    mailerService;
    constructor(customerService, jwtService, configService, mailerService) {
        this.customerService = customerService;
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
    async resetPassword(email) {
        const customer = await this.customerService.getCustomerByEmail(email);
        if (!customer) {
            throw new common_1.HttpException('Customer not found', common_1.HttpStatus.NOT_FOUND);
        }
        const token = this.generateToken();
        const sendEmail = {
            from: { name: 'Matheus', address: 'matheusmarcelo314@gmail.com' },
            recipients: [{ name: 'Marcelo', address: 'matheusmarcelo314@gmail.com' }],
            subject: 'Reset password test',
            html: `<p><strong>token: ${token}</strong></p>, não compartilhe seu token`
        };
        return await this.mailerService.sendEmail(sendEmail);
    }
    generateToken() {
        return Math.floor(100000 + Math.random() * 900000);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(DITokens_enum_1.DITokensService.CUSTOMER_SERVICE)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService,
        config_1.ConfigService,
        mailer_service_1.MailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map