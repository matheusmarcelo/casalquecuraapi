"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTableUserActivities1761700649829 = void 0;
const typeorm_1 = require("typeorm");
class UpdateTableUserActivities1761700649829 {
    async up(queryRunner) {
        await queryRunner.dropIndex("user_activities", "IDX_USER_ACTIVITIES_USER_ACTIVITY");
        await queryRunner.createIndex("user_activities", new typeorm_1.TableIndex({
            name: "IDX_USER_ACTIVITIES_USER_NON_UNIQUE",
            columnNames: ["user_id"],
            isUnique: false,
        }));
        await queryRunner.createIndex("user_activities", new typeorm_1.TableIndex({
            name: "IDX_USER_ACTIVITIES_ACTIVITY_NON_UNIQUE",
            columnNames: ["activity_id"],
            isUnique: false,
        }));
        await queryRunner.createIndex("user_activities", new typeorm_1.TableIndex({
            name: "IDX_USER_ACTIVITIES_USER_ACTIVITY_NON_UNIQUE",
            columnNames: ["user_id", "activity_id"],
            isUnique: false,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex("user_activities", "IDX_USER_ACTIVITIES_USER_ACTIVITY_NON_UNIQUE");
        await queryRunner.dropIndex("user_activities", "IDX_USER_ACTIVITIES_ACTIVITY_NON_UNIQUE");
        await queryRunner.dropIndex("user_activities", "IDX_USER_ACTIVITIES_USER_NON_UNIQUE");
        await queryRunner.createIndex("user_activities", new typeorm_1.TableIndex({
            name: "IDX_USER_ACTIVITIES_USER_ACTIVITY",
            columnNames: ["user_id", "activity_id"],
            isUnique: true,
        }));
    }
}
exports.UpdateTableUserActivities1761700649829 = UpdateTableUserActivities1761700649829;
//# sourceMappingURL=1761700649829-UpdateTableUserActivities.js.map