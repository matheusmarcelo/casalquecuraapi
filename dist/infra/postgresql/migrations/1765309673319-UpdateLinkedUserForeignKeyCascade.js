"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLinkedUserForeignKeyCascade1765309673319 = void 0;
const typeorm_1 = require("typeorm");
class UpdateLinkedUserForeignKeyCascade1765309673319 {
    async up(queryRunner) {
        await queryRunner.dropForeignKey("user_activities", "FK_USER_ACTIVITIES_LINKED_USER");
        await queryRunner.createForeignKey("user_activities", new typeorm_1.TableForeignKey({
            name: "FK_USER_ACTIVITIES_LINKED_USER",
            columnNames: ["linked_user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "linked_users",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey("user_activities", "FK_USER_ACTIVITIES_LINKED_USER");
        await queryRunner.createForeignKey("user_activities", new typeorm_1.TableForeignKey({
            name: "FK_USER_ACTIVITIES_LINKED_USER",
            columnNames: ["linked_user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "linked_users",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
        }));
    }
}
exports.UpdateLinkedUserForeignKeyCascade1765309673319 = UpdateLinkedUserForeignKeyCascade1765309673319;
//# sourceMappingURL=1765309673319-UpdateLinkedUserForeignKeyCascade.js.map