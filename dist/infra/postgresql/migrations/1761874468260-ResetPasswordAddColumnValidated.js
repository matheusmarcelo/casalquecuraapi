"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordAddColumnValidated1761874468260 = void 0;
const typeorm_1 = require("typeorm");
class ResetPasswordAddColumnValidated1761874468260 {
    async up(queryRunner) {
        await queryRunner.addColumn('reset_password', new typeorm_1.TableColumn({
            name: 'validated',
            type: 'boolean',
            default: false,
            isNullable: false,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('reset_password', 'validated');
    }
}
exports.ResetPasswordAddColumnValidated1761874468260 = ResetPasswordAddColumnValidated1761874468260;
//# sourceMappingURL=1761874468260-ResetPasswordAddColumnValidated.js.map