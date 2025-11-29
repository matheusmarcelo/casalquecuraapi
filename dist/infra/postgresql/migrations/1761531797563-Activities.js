"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activities1761531694725 = void 0;
const typeorm_1 = require("typeorm");
class Activities1761531694725 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "activities",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "identity",
                },
                {
                    name: "title",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "description",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "score",
                    type: "decimal",
                    precision: 10,
                    scale: 2,
                    isNullable: false,
                },
                {
                    name: "isGeneral",
                    type: "boolean",
                    default: true,
                    isNullable: false,
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    isNullable: false,
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP",
                    isNullable: false,
                },
            ],
        }), true);
        await queryRunner.createIndex("activities", new typeorm_1.TableIndex({
            name: "IDX_ACTIVITIES_IS_GENERAL",
            columnNames: ["isGeneral"],
        }));
        await queryRunner.createIndex("activities", new typeorm_1.TableIndex({
            name: "IDX_ACTIVITIES_CREATED_AT",
            columnNames: ["createdAt"],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex("activities", "IDX_ACTIVITIES_CREATED_AT");
        await queryRunner.dropIndex("activities", "IDX_ACTIVITIES_IS_GENERAL");
        await queryRunner.dropTable("activities");
    }
}
exports.Activities1761531694725 = Activities1761531694725;
//# sourceMappingURL=1761531797563-Activities.js.map