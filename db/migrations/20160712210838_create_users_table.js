exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments();
      table.string('name');
    }),
    knex.schema.createTable('dishes', function (table) {
      table.increments();
      table.varchar('name', 50);
      table.varchar('description', 50);
      table.float('price', 2);
    }),
    knex.schema.createTable('orders', function (table) {
      table.increments();
      table.varchar('name', 50);
      table.bigInteger('phone_number');
    }),
    knex.schema.createTable('dishes_orders', function(table) {
      table.integer('orders_id');
      table.integer('dishes_id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('dishes'),
    knex.schema.dropTable('orders'),
    knex.schema.dropTable('dishes_orders')
  ]);
};
