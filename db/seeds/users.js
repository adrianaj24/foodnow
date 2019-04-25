exports.seed = function(knex, Promise) {
  // return knex.schema.dropTable('users', 'dishes','orders','dishes_orders')
  return Promise.all([
    knex('dishes').del(),
    knex('orders').del(),
    knex('dishes_orders').del()])
    .then(function () {
      return Promise.all([
        knex('dishes').insert({id: 1, name: 'Dish A', description: 'desc A', price: 9.9, type: 'main'}),
        knex('dishes').insert({id: 2, name: 'Dish B', description: 'desc B', price: 19.9, type: 'main'}),
        knex('dishes').insert({id: 3, name: 'Dish C', description: 'desc C', price: 29.9, type: 'drink'}),
        knex('dishes').insert({id: 4, name: 'Dish D', description: 'desc D', price: 6.9, type: 'dessert'}),
        knex('orders').insert({id: 1, name: 'Mike', phone_number: 1111111111}),
        knex('orders').insert({id: 2, name: 'Carmen', phone_number: 2222222222}),
        knex('dishes_orders').insert({orders_id: 1, dishes_id: 1}),
        knex('dishes_orders').insert({orders_id: 1, dishes_id: 1}),
        knex('dishes_orders').insert({orders_id: 1, dishes_id: 1}),
        knex('dishes_orders').insert({orders_id: 1, dishes_id: 3}),
        knex('dishes_orders').insert({orders_id: 2, dishes_id: 4}),
        knex('dishes_orders').insert({orders_id: 2, dishes_id: 2}),
        knex('dishes_orders').insert({orders_id: 2, dishes_id: 2})
      ]);
    });
};
