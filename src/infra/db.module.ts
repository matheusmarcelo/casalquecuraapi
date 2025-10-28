import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepositoryPostgresql } from './postgresql/repositories/customer/customer-repository-postgresql.repository';
import { Customer } from 'src/entitites/customer/customer.entity';
import { DITokensRepository } from 'src/constants/enums/DITokens/DITokens.enum';
import { ActivityRepositoryPostgresql } from './postgresql/repositories/activity/activity-repository-postgresql.repository';

const repositoryProviders = [
    {
        provide: DITokensRepository.CUSTOMER_REPOSITORY,
        useClass: CustomerRepositoryPostgresql
    }
];

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>("DB_HOST"),
                port: +configService.get<number>("DB_PORT")!,
                username: configService.get<string>("DB_USERNAME"),
                password: configService.get<string>("DB_PASSWORD"),
                database: configService.get<string>("DB_NAME"),
                entities: [__dirname + '/../entitites/**/*.{js,ts}'],
                migrations: [__dirname + '/migrations/**.ts'],
                synchronize: false,
            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([Customer]),
    ],
    providers: [...repositoryProviders],
    exports: [...repositoryProviders],
})
export class DBModule { }
