"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonthActivities1761947084693 = void 0;
const typeorm_1 = require("typeorm");
class MonthActivities1761947084693 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'month_activities',
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
                    name: 'total_score',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    isNullable: false,
                },
                {
                    name: 'month',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'year',
                    type: 'int',
                    isNullable: false,
                },
            ],
        }), true);
        await queryRunner.createForeignKey('month_activities', new typeorm_1.TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_user_month_year" 
            ON "month_activities" ("user_id", "month", "year")
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "IDX_user_month_year"`);
        const table = await queryRunner.getTable('month_activities');
        const userForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('user_id') !== -1);
        if (userForeignKey) {
            await queryRunner.dropForeignKey('month_activities', userForeignKey);
        }
        await queryRunner.dropTable('month_activities');
    }
}
exports.MonthActivities1761947084693 = MonthActivities1761947084693;
//# sourceMappingURL=1761947084693-MonthActivities.js.map