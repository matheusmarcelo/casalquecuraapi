
import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

config();

const configService = new ConfigService();

const data_source_options: DataSourceOptions = {
    type: 'postgres',
    host: configService.get<string>("DB_HOST"),
    port: +configService.get<number>("DB_PORT")!,
    username: configService.get<string>("DB_USERNAME"),
    password: configService.get<string>("DB_PASSWORD"),
    database: configService.get<string>("DB_NAME"),
    entities: [__dirname + '/../entitites/**/*.{js,ts}'],
    migrations: [__dirname + '/migrations/*.ts'],
    synchronize: false
}

export default new DataSource(data_source_options);