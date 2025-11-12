"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuxLinkedUsers1761779810646 = void 0;
const typeorm_1 = require("typeorm");
class AuxLinkedUsers1761779810646 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "aux_linked_users",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "identity",
                },
                {
                    name: "from_user_id",
                    type: "uuid",
                    isNullable: false,
                },
                {
                    name: "to_user_id",
                    type: "uuid",
                    isNullable: false,
                },
                {
                    name: "expirate_at",
                    type: "date",
                    default: "CURRENT_DATE + INTERVAL '2 days'",
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
        await queryRunner.createForeignKey("aux_linked_users", new typeorm_1.TableForeignKey({
            name: "FK_AUX_LINKED_USERS_FROM",
            columnNames: ["from_user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
        await queryRunner.createForeignKey("aux_linked_users", new typeorm_1.TableForeignKey({
            name: "FK_AUX_LINKED_USERS_TO",
            columnNames: ["to_user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }));
        await queryRunner.createIndex("aux_linked_users", new typeorm_1.TableIndex({
            name: "IDX_AUX_LINKED_USERS_FROM_TO_UNIQUE",
            columnNames: ["from_user_id", "to_user_id"],
            isUnique: true,
        }));
        await queryRunner.createIndex("aux_linked_users", new typeorm_1.TableIndex({
            name: "IDX_AUX_LINKED_USERS_FROM",
            columnNames: ["from_user_id"],
        }));
        await queryRunner.createIndex("aux_linked_users", new typeorm_1.TableIndex({
            name: "IDX_AUX_LINKED_USERS_TO",
            columnNames: ["to_user_id"],
        }));
        await queryRunner.createIndex("aux_linked_users", new typeorm_1.TableIndex({
            name: "IDX_AUX_LINKED_USERS_EXPIRATE",
            columnNames: ["expirate_at"],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex("aux_linked_users", "IDX_AUX_LINKED_USERS_EXPIRATE");
        await queryRunner.dropIndex("aux_linked_users", "IDX_AUX_LINKED_USERS_TO");
        await queryRunner.dropIndex("aux_linked_users", "IDX_AUX_LINKED_USERS_FROM");
        await queryRunner.dropIndex("aux_linked_users", "IDX_AUX_LINKED_USERS_FROM_TO_UNIQUE");
        await queryRunner.dropForeignKey("aux_linked_users", "FK_AUX_LINKED_USERS_TO");
        await queryRunner.dropForeignKey("aux_linked_users", "FK_AUX_LINKED_USERS_FROM");
        await queryRunner.dropTable("aux_linked_users");
    }
}
exports.AuxLinkedUsers1761779810646 = AuxLinkedUsers1761779810646;
//# sourceMappingURL=1761779810646-AuxLinkedUsers.js.map