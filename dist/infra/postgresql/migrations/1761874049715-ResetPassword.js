"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPassword1761874049715 = void 0;
const typeorm_1 = require("typeorm");
class ResetPassword1761874049715 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'reset_password',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'identity',
                },
                {
                    name: 'token',
                    type: 'varchar',
                    length: '10',
                    isNullable: false,
                },
                {
                    name: 'ip_address',
                    type: 'varchar',
                    length: '45',
                    isNullable: false,
                },
                {
                    name: 'expires_in',
                    type: 'timestamp',
                    default: "CURRENT_TIMESTAMP + INTERVAL '30 minutes'",
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('reset_password');
    }
}
exports.ResetPassword1761874049715 = ResetPassword1761874049715;
//# sourceMappingURL=1761874049715-ResetPassword.js.map