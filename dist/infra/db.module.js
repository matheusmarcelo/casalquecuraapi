"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const customer_repository_postgresql_1 = require("./postgresql/repositories/customer/customer-repository.postgresql");
const customer_entity_1 = require("../entitites/customer/customer.entity");
const DITokens_enum_1 = require("../constants/enums/DITokens/DITokens.enum");
const activity_repository_postgresql_1 = require("./postgresql/repositories/activity/activity-repository.postgresql");
const activity_entity_1 = require("../entitites/activity/activity.entity");
const customer_activity_repository_postgresql_1 = require("./postgresql/repositories/customer_activity/customer-activity-repository.postgresql");
const customer_activity_entity_1 = require("../entitites/customer-activity/customer-activity.entity");
const linked_users_repository_postgresql_1 = require("./postgresql/repositories/linked_users/linked-users-repository.postgresql");
const aux_linked_users_entity_1 = require("../entitites/linked-users/aux_linked_users.entity");
const linked_users_entity_1 = require("../entitites/linked-users/linked_users.entity");
const reset_password_repository_postgresql_1 = require("./postgresql/repositories/reset_password/reset-password-repository.postgresql");
const reset_password_entity_1 = require("../entitites/reset-password/reset_password.entity");
const repositoryProviders = [
    {
        provide: DITokens_enum_1.DITokensRepository.CUSTOMER_REPOSITORY,
        useClass: customer_repository_postgresql_1.CustomerRepositoryPostgresql
    },
    {
        provide: DITokens_enum_1.DITokensRepository.ACTIVITY_REPOSITORY,
        useClass: activity_repository_postgresql_1.ActivityRepositoryPostgresql
    },
    {
        provide: DITokens_enum_1.DITokensRepository.CUSTOMER_ACTIVITY_REPOSITORY,
        useClass: customer_activity_repository_postgresql_1.CustomerActivityRepositoryPostgresql
    },
    {
        provide: DITokens_enum_1.DITokensRepository.LINKED_USERS_REPOSITORY,
        useClass: linked_users_repository_postgresql_1.LinkedUsersRepositoryPostgresql
    },
    {
        provide: DITokens_enum_1.DITokensRepository.RESET_PASSWORD_REPOSITORY,
        useClass: reset_password_repository_postgresql_1.ResetPasswordRepositoryPostgresql
    },
];
let DBModule = class DBModule {
};
exports.DBModule = DBModule;
exports.DBModule = DBModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: async (configService) => ({
                    type: 'postgres',
                    host: configService.get("DB_HOST"),
                    port: +configService.get("DB_PORT"),
                    username: configService.get("DB_USERNAME"),
                    password: configService.get("DB_PASSWORD"),
                    database: configService.get("DB_NAME"),
                    entities: [__dirname + '/../entitites/**/*.{js,ts}'],
                    migrations: [__dirname + '/migrations/**.ts'],
                    synchronize: false,
                }),
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forFeature([
                customer_entity_1.Customer,
                activity_entity_1.Activity,
                customer_activity_entity_1.CustomerActivity,
                aux_linked_users_entity_1.AuxLinkedUsers,
                linked_users_entity_1.LinkedUsers,
                reset_password_entity_1.ResetPassword
            ]),
        ],
        providers: [...repositoryProviders],
        exports: [...repositoryProviders],
    })
], DBModule);
//# sourceMappingURL=db.module.js.map