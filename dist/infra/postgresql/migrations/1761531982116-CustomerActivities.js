"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerActivities1761531694726 = void 0;
const typeorm_1 = require("typeorm");
class CustomerActivities1761531694726 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "user_activities",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "identity",
                },
                {
                    name: "user_id",
                    type: "uuid",
                    isNullable: false,
                },
                {
                    name: "activity_id",
                    type: "integer",
                    isNullable: false,
                },
            ],
        }), true);
        await queryRunner.createForeignKey("user_activities", new typeorm_1.TableForeignKey({
            name: "FK_USER_ACTIVITIES_USER",
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
        }));
        await queryRunner.createForeignKey("user_activities", new typeorm_1.TableForeignKey({
            name: "FK_USER_ACTIVITIES_ACTIVITY",
            columnNames: ["activity_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "activities",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
        }));
        await queryRunner.createIndex("user_activities", new typeorm_1.TableIndex({
            name: "IDX_USER_ACTIVITIES_USER_ACTIVITY",
            columnNames: ["user_id", "activity_id"],
            isUnique: true,
        }));
        await queryRunner.createIndex("user_activities", new typeorm_1.TableIndex({
            name: "IDX_USER_ACTIVITIES_USER",
            columnNames: ["user_id"],
        }));
        await queryRunner.createIndex("user_activities", new typeorm_1.TableIndex({
            name: "IDX_USER_ACTIVITIES_ACTIVITY",
            columnNames: ["activity_id"],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex("user_activities", "IDX_USER_ACTIVITIES_ACTIVITY");
        await queryRunner.dropIndex("user_activities", "IDX_USER_ACTIVITIES_USER");
        await queryRunner.dropIndex("user_activities", "IDX_USER_ACTIVITIES_USER_ACTIVITY");
        await queryRunner.dropForeignKey("user_activities", "FK_USER_ACTIVITIES_ACTIVITY");
        await queryRunner.dropForeignKey("user_activities", "FK_USER_ACTIVITIES_USER");
        await queryRunner.dropTable("user_activities");
    }
}
exports.CustomerActivities1761531694726 = CustomerActivities1761531694726;
//# sourceMappingURL=1761531982116-CustomerActivities.js.map