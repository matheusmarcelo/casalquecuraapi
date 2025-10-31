import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepositoryPostgresql } from './postgresql/repositories/customer/customer-repository.postgresql';
import { Customer } from 'src/entitites/customer/customer.entity';
import { DITokensRepository } from 'src/constants/enums/DITokens/DITokens.enum';
import { ActivityRepositoryPostgresql } from './postgresql/repositories/activity/activity-repository.postgresql';
import { Activity } from 'src/entitites/activity/activity.entity';
import { CustomerActivityRepositoryPostgresql } from './postgresql/repositories/customer_activity/customer-activity-repository.postgresql';
import { CustomerActivity } from 'src/entitites/customer-activity/customer-activity.entity';
import { LinkedUsersRepositoryPostgresql } from './postgresql/repositories/linked_users/linked-users-repository.postgresql';
import { AuxLinkedUsers } from 'src/entitites/linked-users/aux_linked_users.entity';
import { LinkedUsers } from 'src/entitites/linked-users/linked_users.entity';
import { ResetPasswordRepositoryPostgresql } from './postgresql/repositories/reset_password/reset-password-repository.postgresql';
import { ResetPassword } from 'src/entitites/reset-password/reset_password.entity';

const repositoryProviders = [
    {
        provide: DITokensRepository.CUSTOMER_REPOSITORY,
        useClass: CustomerRepositoryPostgresql
    },
    {
        provide: DITokensRepository.ACTIVITY_REPOSITORY,
        useClass: ActivityRepositoryPostgresql
    },
    {
        provide: DITokensRepository.CUSTOMER_ACTIVITY_REPOSITORY,
        useClass: CustomerActivityRepositoryPostgresql
    },
    {
        provide: DITokensRepository.LINKED_USERS_REPOSITORY,
        useClass: LinkedUsersRepositoryPostgresql
    },
    {
        provide: DITokensRepository.RESET_PASSWORD_REPOSITORY,
        useClass: ResetPasswordRepositoryPostgresql
    },
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
        TypeOrmModule.forFeature([
            Customer,
            Activity,
            CustomerActivity,
            AuxLinkedUsers,
            LinkedUsers,
            ResetPassword
        ]),
    ],
    providers: [...repositoryProviders],
    exports: [...repositoryProviders],
})
export class DBModule { }
