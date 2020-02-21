exports.up = async function (knex) {
  await knex.schema.createTable('parkinglot', (t) => {
    t.integer('row').notNullable();
    t.integer('col').notNullable();
    t.string('value', 20).notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable('parkinglot');
};
