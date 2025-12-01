"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDalyActivitiesForeignKey1764529469645 = void 0;
const typeorm_1 = require("typeorm");
class UpdateDalyActivitiesForeignKey1764529469645 {
    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX "IDX_user_activity_date"`);
        const table = await queryRunner.getTable('daly_activities');
        const userForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('user_id') !== -1);
        if (userForeignKey) {
            await queryRunner.dropForeignKey('daly_activities', userForeignKey);
        }
        await queryRunner.changeColumn("daly_activities", "user_id", new typeorm_1.TableColumn({
            name: "user_id",
            type: "uuid",
            isNullable: true,
        }));
        await queryRunner.addColumn("daly_activities", new typeorm_1.TableColumn({
            name: "linked_user_id",
            type: "integer",
            isNullable: true,
        }));
        await queryRunner.createForeignKey("daly_activities", new typeorm_1.TableForeignKey({
            name: "FK_DALY_ACTIVITIES_USER",
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
        await queryRunner.createForeignKey("daly_activities", new typeorm_1.TableForeignKey({
            name: "FK_DALY_ACTIVITIES_LINKED_USER",
            columnNames: ["linked_user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "linked_users",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
        await queryRunner.query(`
            ALTER TABLE daly_activities 
            ADD CONSTRAINT CHK_DALY_ACTIVITIES_SINGLE_USER 
            CHECK (
                (user_id IS NOT NULL AND linked_user_id IS NULL) OR 
                (user_id IS NULL AND linked_user_id IS NOT NULL)
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_user_activity_date" 
            ON "daly_activities" (
                COALESCE(user_id::text, linked_user_id::text), 
                activity_id, 
                DATE(completion_date)
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "IDX_user_activity_date"`);
        await queryRunner.query(`
            ALTER TABLE daly_activities 
            DROP CONSTRAINT IF EXISTS CHK_DALY_ACTIVITIES_SINGLE_USER
        `);
        await queryRunner.dropForeignKey("daly_activities", "FK_DALY_ACTIVITIES_LINKED_USER");
        await queryRunner.dropForeignKey("daly_activities", "FK_DALY_ACTIVITIES_USER");
        await queryRunner.dropColumn("daly_activities", "linked_user_id");
        await queryRunner.changeColumn("daly_activities", "user_id", new typeorm_1.TableColumn({
            name: "user_id",
            type: "uuid",
            isNullable: false,
        }));
        await queryRunner.createForeignKey("daly_activities", new typeorm_1.TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_user_activity_date" 
            ON "daly_activities" (user_id, activity_id, DATE(completion_date))
        `);
    }
}
exports.UpdateDalyActivitiesForeignKey1764529469645 = UpdateDalyActivitiesForeignKey1764529469645;
//# sourceMappingURL=1764529469645-UpdateDalyActivitiesForeignKey.js.map