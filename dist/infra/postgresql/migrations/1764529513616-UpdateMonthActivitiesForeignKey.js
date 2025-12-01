"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMonthActivitiesForeignKey1764529513616 = void 0;
const typeorm_1 = require("typeorm");
class UpdateMonthActivitiesForeignKey1764529513616 {
    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX "IDX_user_month_year"`);
        const table = await queryRunner.getTable('month_activities');
        const userForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('user_id') !== -1);
        if (userForeignKey) {
            await queryRunner.dropForeignKey('month_activities', userForeignKey);
        }
        await queryRunner.changeColumn("month_activities", "user_id", new typeorm_1.TableColumn({
            name: "user_id",
            type: "uuid",
            isNullable: true,
        }));
        await queryRunner.addColumn("month_activities", new typeorm_1.TableColumn({
            name: "linked_user_id",
            type: "integer",
            isNullable: true,
        }));
        await queryRunner.createForeignKey("month_activities", new typeorm_1.TableForeignKey({
            name: "FK_MONTH_ACTIVITIES_USER",
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
        await queryRunner.createForeignKey("month_activities", new typeorm_1.TableForeignKey({
            name: "FK_MONTH_ACTIVITIES_LINKED_USER",
            columnNames: ["linked_user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "linked_users",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
        await queryRunner.query(`
            ALTER TABLE month_activities 
            ADD CONSTRAINT CHK_MONTH_ACTIVITIES_SINGLE_USER 
            CHECK (
                (user_id IS NOT NULL AND linked_user_id IS NULL) OR 
                (user_id IS NULL AND linked_user_id IS NOT NULL)
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_user_month_year" 
            ON "month_activities" (
                COALESCE(user_id::text, linked_user_id::text), 
                month, 
                year
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "IDX_user_month_year"`);
        await queryRunner.query(`
            ALTER TABLE month_activities 
            DROP CONSTRAINT IF EXISTS CHK_MONTH_ACTIVITIES_SINGLE_USER
        `);
        await queryRunner.dropForeignKey("month_activities", "FK_MONTH_ACTIVITIES_LINKED_USER");
        await queryRunner.dropForeignKey("month_activities", "FK_MONTH_ACTIVITIES_USER");
        await queryRunner.dropColumn("month_activities", "linked_user_id");
        await queryRunner.changeColumn("month_activities", "user_id", new typeorm_1.TableColumn({
            name: "user_id",
            type: "uuid",
            isNullable: false,
        }));
        await queryRunner.createForeignKey("month_activities", new typeorm_1.TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_user_month_year" 
            ON "month_activities" (user_id, month, year)
        `);
    }
}
exports.UpdateMonthActivitiesForeignKey1764529513616 = UpdateMonthActivitiesForeignKey1764529513616;
//# sourceMappingURL=1764529513616-UpdateMonthActivitiesForeignKey.js.map