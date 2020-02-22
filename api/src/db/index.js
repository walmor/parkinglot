import knex from 'knex';
import config from '../config';

let database;

export async function getDatabase() {
  if (!database) {
    database = knex(config.knex);
    await checkDatabase();
  }

  return database;
}

async function checkDatabase() {
  const pendingMigrations = (await database.migrate.list())[1];

  if (pendingMigrations.length) {
    await database.migrate.latest();
    await database.seed.run();
  }
}
