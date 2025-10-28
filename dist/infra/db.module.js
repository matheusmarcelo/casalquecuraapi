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
const customer_repository_postgresql_repository_1 = require("./postgresql/repositories/customer/customer-repository-postgresql.repository");
const customer_entity_1 = require("../entitites/customer/customer.entity");
const DITokens_enum_1 = require("../constants/enums/DITokens/DITokens.enum");
const activity_repository_postgresql_repository_1 = require("./postgresql/repositories/activity/activity-repository-postgresql.repository");
const activity_entity_1 = require("../entitites/activity/activity.entity");
const repositoryProviders = [
    {
        provide: DITokens_enum_1.DITokensRepository.CUSTOMER_REPOSITORY,
        useClass: customer_repository_postgresql_repository_1.CustomerRepositoryPostgresql
    },
    {
        provide: DITokens_enum_1.DITokensRepository.ACTIVITY_REPOSITORY,
        useClass: activity_repository_postgresql_repository_1.ActivityRepositoryPostgresql
    }
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
            typeorm_1.TypeOrmModule.forFeature([customer_entity_1.Customer, activity_entity_1.Activity]),
        ],
        providers: [...repositoryProviders],
        exports: [...repositoryProviders],
    })
], DBModule);
//# sourceMappingURL=db.module.js.map