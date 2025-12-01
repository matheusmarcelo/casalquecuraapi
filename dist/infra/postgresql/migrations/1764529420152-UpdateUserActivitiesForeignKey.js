"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserActivitiesForeignKey1764529420152 = void 0;
const typeorm_1 = require("typeorm");
class UpdateUserActivitiesForeignKey1764529420152 {
    async up(queryRunner) {
        await queryRunner.dropIndex("user_activities", "IDX_USER_ACTIVITIES_USER_ACTIVITY_NON_UNIQUE");
        await queryRunner.dropIndex("user_activities", "IDX_USER_ACTIVITIES_ACTIVITY_NON_UNIQUE");
        await queryRunner.dropIndex("user_activities", "IDX_USER_ACTIVITIES_USER_NON_UNIQUE");
        await queryRunner.dropForeignKey("user_activities", "FK_USER_ACTIVITIES_USER");
        await queryRunner.changeColumn("user_activities", "user_id", new typeorm_1.TableColumn({
            name: "user_id",
            type: "uuid",
            isNullable: true,
        }));
        await queryRunner.addColumn("user_activities", new typeorm_1.TableColumn({
            name: "linked_user_id",
            type: "integer",
            isNullable: true,
        }));
        await queryRunner.createForeignKey("user_activities", new typeorm_1.TableForeignKey({
            name: "FK_USER_ACTIVITIES_USER",
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
        }));
        await queryRunner.createForeignKey("user_activities", new typeorm_1.TableForeignKey({
            name: "FK_USER_ACTIVITIES_LINKED_USER",
            columnNames: ["linked_user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "linked_users",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
        }));
        await queryRunner.query(`
            ALTER TABLE user_activities 
            ADD CONSTRAINT CHK_USER_ACTIVITIES_SINGLE_USER 
            CHECK (
                (user_id IS NOT NULL AND linked_user_id IS NULL) OR 
                (user_id IS NULL AND linked_user_id IS NOT NULL)
            )
        `);
        await queryRunner.createIndex("user_activities", new typeorm_1.TableIndex({
            name: "IDX_USER_ACTIVITIES_USER_NON_UNIQUE",
            columnNames: ["user_id"],
            isUnique: false,
        }));
        await queryRunner.createIndex("user_activities", new typeorm_1.TableIndex({
            name: "IDX_USER_ACTIVITIES_LINKED_USER_NON_UNIQUE",
            columnNames: ["linked_user_id"],
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
        await queryRunner.createIndex("user_activities", new typeorm_1.TableIndex({
            name: "IDX_USER_ACTIVITIES_LINKED_USER_ACTIVITY_NON_UNIQUE",
            columnNames: ["linked_user_id", "activity_id"],
            isUnique: false,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex("user_activities", "IDX_USER_ACTIVITIES_LINKED_USER_ACTIVITY_NON_UNIQUE");
        await queryRunner.dropIndex("user_activities", "IDX_USER_ACTIVITIES_USER_ACTIVITY_NON_UNIQUE");
        await queryRunner.dropIndex("user_activities", "IDX_USER_ACTIVITIES_ACTIVITY_NON_UNIQUE");
        await queryRunner.dropIndex("user_activities", "IDX_USER_ACTIVITIES_LINKED_USER_NON_UNIQUE");
        await queryRunner.dropIndex("user_activities", "IDX_USER_ACTIVITIES_USER_NON_UNIQUE");
        await queryRunner.query(`
            ALTER TABLE user_activities 
            DROP CONSTRAINT IF EXISTS CHK_USER_ACTIVITIES_SINGLE_USER
        `);
        await queryRunner.dropForeignKey("user_activities", "FK_USER_ACTIVITIES_LINKED_USER");
        await queryRunner.dropForeignKey("user_activities", "FK_USER_ACTIVITIES_USER");
        await queryRunner.dropColumn("user_activities", "linked_user_id");
        await queryRunner.changeColumn("user_activities", "user_id", new typeorm_1.TableColumn({
            name: "user_id",
            type: "uuid",
            isNullable: false,
        }));
        await queryRunner.createForeignKey("user_activities", new typeorm_1.TableForeignKey({
            name: "FK_USER_ACTIVITIES_USER",
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
        }));
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
}
exports.UpdateUserActivitiesForeignKey1764529420152 = UpdateUserActivitiesForeignKey1764529420152;
//# sourceMappingURL=1764529420152-UpdateUserActivitiesForeignKey.js.map