"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customers1761531694724 = void 0;
const typeorm_1 = require("typeorm");
class Customers1761531694724 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.createTable(new typeorm_1.Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()",
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "255",
                    isNullable: false,
                },
                {
                    name: "email",
                    type: "varchar",
                    length: "150",
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: "password",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "date_of_birth",
                    type: "date",
                    isNullable: false,
                },
                {
                    name: "phone",
                    type: "varchar",
                    length: "100",
                    isNullable: false,
                },
                {
                    name: "street",
                    type: "varchar",
                    length: "150",
                    isNullable: true,
                },
                {
                    name: "neighborhood",
                    type: "varchar",
                    length: "100",
                    isNullable: true,
                },
                {
                    name: "zipcode",
                    type: "varchar",
                    length: "20",
                    isNullable: true,
                },
                {
                    name: "house_number",
                    type: "varchar",
                    length: "10",
                    isNullable: true,
                },
                {
                    name: "description",
                    type: "text",
                    isNullable: true,
                },
                {
                    name: "gender",
                    type: "varchar",
                    length: "10",
                    isNullable: true,
                },
                {
                    name: "role",
                    type: "varchar",
                    length: "50",
                    default: "'CUSTOMER'",
                    isNullable: false,
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    isNullable: false,
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP",
                    isNullable: false,
                },
                {
                    name: "isActive",
                    type: "boolean",
                    default: true,
                    isNullable: false,
                },
            ],
        }), true);
        await queryRunner.createIndex("users", new typeorm_1.TableIndex({
            name: "IDX_USERS_EMAIL",
            columnNames: ["email"],
        }));
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp"`);
        await queryRunner.dropIndex("users", "IDX_USERS_EMAIL");
        await queryRunner.dropTable("users");
    }
}
exports.Customers1761531694724 = Customers1761531694724;
//# sourceMappingURL=1761531694724-Customers.js.map