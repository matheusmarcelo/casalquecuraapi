"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
(0, dotenv_1.config)();
const configService = new config_1.ConfigService();
const data_source_options = {
    type: 'postgres',
    host: configService.get("DB_HOST"),
    port: +configService.get("DB_PORT"),
    username: configService.get("DB_USERNAME"),
    password: configService.get("DB_PASSWORD"),
    database: configService.get("DB_NAME"),
    entities: [__dirname + '/../entitites/**/*.{js,ts}'],
    migrations: [__dirname + '/migrations/*.ts'],
    synchronize: false
};
exports.default = new typeorm_1.DataSource(data_source_options);
//# sourceMappingURL=typeOrm.migration-config.js.map