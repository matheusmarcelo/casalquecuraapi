"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedUsers1761779938363 = void 0;
const typeorm_1 = require("typeorm");
class LinkedUsers1761779938363 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "linked_users",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "identity",
                },
                {
                    name: "user_id1",
                    type: "uuid",
                    isNullable: false,
                },
                {
                    name: "user_id2",
                    type: "uuid",
                    isNullable: false,
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    isNullable: false,
                },
            ],
        }), true);
        await queryRunner.createForeignKey("linked_users", new typeorm_1.TableForeignKey({
            name: "FK_LINKED_USERS_USER1",
            columnNames: ["user_id1"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
        await queryRunner.createForeignKey("linked_users", new typeorm_1.TableForeignKey({
            name: "FK_LINKED_USERS_USER2",
            columnNames: ["user_id2"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
        await queryRunner.createIndex("linked_users", new typeorm_1.TableIndex({
            name: "IDX_LINKED_USERS_UNIQUE",
            columnNames: ["user_id1", "user_id2"],
            isUnique: true,
        }));
        await queryRunner.createIndex("linked_users", new typeorm_1.TableIndex({
            name: "IDX_LINKED_USERS_USER1",
            columnNames: ["user_id1"],
        }));
        await queryRunner.createIndex("linked_users", new typeorm_1.TableIndex({
            name: "IDX_LINKED_USERS_USER2",
            columnNames: ["user_id2"],
        }));
        await queryRunner.query(`
            ALTER TABLE linked_users 
            ADD CONSTRAINT CHK_LINKED_USERS_DIFFERENT 
            CHECK (user_id1 != user_id2)
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE linked_users 
            DROP CONSTRAINT IF EXISTS CHK_LINKED_USERS_DIFFERENT
        `);
        await queryRunner.dropIndex("linked_users", "IDX_LINKED_USERS_USER2");
        await queryRunner.dropIndex("linked_users", "IDX_LINKED_USERS_USER1");
        await queryRunner.dropIndex("linked_users", "IDX_LINKED_USERS_UNIQUE");
        await queryRunner.dropForeignKey("linked_users", "FK_LINKED_USERS_USER2");
        await queryRunner.dropForeignKey("linked_users", "FK_LINKED_USERS_USER1");
        await queryRunner.dropTable("linked_users");
    }
}
exports.LinkedUsers1761779938363 = LinkedUsers1761779938363;
//# sourceMappingURL=1761779938363-LinkedUsers.js.map