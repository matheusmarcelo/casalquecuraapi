"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DalyActivities1761947077139 = void 0;
const typeorm_1 = require("typeorm");
class DalyActivities1761947077139 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'daly_activities',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'identity',
                },
                {
                    name: 'user_id',
                    type: "uuid",
                    isNullable: false,
                },
                {
                    name: 'activity_id',
                    type: 'integer',
                    isNullable: false,
                },
                {
                    name: 'completion_date',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'score',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    isNullable: false,
                },
            ],
        }), true);
        await queryRunner.createForeignKey('daly_activities', new typeorm_1.TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
        await queryRunner.createForeignKey('daly_activities', new typeorm_1.TableForeignKey({
            columnNames: ['activity_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'activities',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_user_activity_date" 
            ON "daly_activities" ("user_id", "activity_id", DATE("completion_date"))
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "IDX_user_activity_date"`);
        const table = await queryRunner.getTable('daly_activities');
        const userForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('user_id') !== -1);
        const activityForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('activity_id') !== -1);
        if (userForeignKey) {
            await queryRunner.dropForeignKey('daly_activities', userForeignKey);
        }
        if (activityForeignKey) {
            await queryRunner.dropForeignKey('daly_activities', activityForeignKey);
        }
        await queryRunner.dropTable('daly_activities');
    }
}
exports.DalyActivities1761947077139 = DalyActivities1761947077139;
//# sourceMappingURL=1761947077139-DalyActivities.js.map