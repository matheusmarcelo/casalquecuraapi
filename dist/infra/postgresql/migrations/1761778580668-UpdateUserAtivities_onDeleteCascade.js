"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserAtivitiesOnDeleteCascade1761778580668 = void 0;
const typeorm_1 = require("typeorm");
class UpdateUserAtivitiesOnDeleteCascade1761778580668 {
    async up(queryRunner) {
        await queryRunner.dropForeignKey("user_activities", "FK_USER_ACTIVITIES_ACTIVITY");
        await queryRunner.createForeignKey("user_activities", new typeorm_1.TableForeignKey({
            name: "FK_USER_ACTIVITIES_ACTIVITY",
            columnNames: ["activity_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "activities",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey("user_activities", "FK_USER_ACTIVITIES_ACTIVITY");
        await queryRunner.createForeignKey("user_activities", new typeorm_1.TableForeignKey({
            name: "FK_USER_ACTIVITIES_ACTIVITY",
            columnNames: ["activity_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "activities",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
        }));
    }
}
exports.UpdateUserAtivitiesOnDeleteCascade1761778580668 = UpdateUserAtivitiesOnDeleteCascade1761778580668;
//# sourceMappingURL=1761778580668-UpdateUserAtivities_onDeleteCascade.js.map