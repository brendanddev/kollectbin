import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('comics', {
        comic_id: 'id',
        title: { type: 'varchar(255)', notNull: true },
        issue: { type: 'integer', notNull: true },
        volume: { type: 'integer', notNull: true },
        author: { type: 'varchar(255)', notNull: true },
        publisher: { type: 'varchar(255)', notNull: true },
        genre: { type: 'varchar(255)', notNull: true },
        is_variant: { type: 'boolean', notNull: true, default: false },
        variant_artist: { type: 'varchar(255)' }
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('comics');
}
