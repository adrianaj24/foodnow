exports.seed = function(knex, Promise) {
  // return knex.schema.dropTable('users', 'dishes','orders','dishes_orders')
  return Promise.all([
    knex('dishes').del(),
    knex('orders').del(),
    knex('dishes_orders').del()])
    .then(function () {
      return Promise.all([
        knex('dishes').insert({id: 1, name: 'Single Portion Wings', description: '1 fla / 1 ser | 1280 - 2830 Cals', price: 15.95, type: 'main'}),
        knex('dishes').insert({id: 2, name: 'Double Portion Wings', description: '2 fla / 2 ser | 960 - 2505 Cals per serving', price: 27.50, type: 'main'}),
        knex('dishes').insert({id: 3, name: 'Triple Portion Wings', description: '3 fla / 3 ser | 640 - 2190 Cals per serving', price: 37.50, type: 'main'}),
        knex('dishes').insert({id: 4, name: 'Foursome', description: '4 fl / 4 ser | 644 - 2190 Cals per serving', price: 48.95, type: 'main'}),
        knex('dishes').insert({id: 5, name: 'Maverick', description: '5 fl / 5 ser | 642 - 2190 Cals per serving', price: 59.95, type: 'main'}),
        knex('dishes').insert({id: 6, name: 'Cowboy', description: '10 fl / 10 ser | 641 - 2189 Cals per serving', price: 115.95, type: 'main'}),
        knex('dishes').insert({id: 7, name: 'White Chocolate Raspberry Cheesecake', description: 'Cheesecake with raspberry and white chocolate', price: 9.99, type: 'dessert'}),
        knex('dishes').insert({id: 8, name: 'Reeses Peanut Butter Cheesecake', description: 'Reeses peanut butter cups combined with cheesecake', price: 13.50, type: 'dessert'}),
        knex('dishes').insert({id: 9, name: 'Black + White Lava Cake', description: 'A heavenly molten chocolate lava cake', price: 14.99, type: 'dessert'}),
        knex('dishes').insert({id: 10, name: 'Fountain Pop', description: 'Free Refils | Pepsi, Diet Pepsi, 7-Up, Ginger Ale', price: 3.50, type: 'drink'}),
        knex('dishes').insert({id: 11, name: 'Iced Tea and Juice', description: 'iced Tea, Apple Juice, Orange Juice', price: 3.75, type: 'drink'}),
        knex('dishes').insert({id: 12, name: 'Water', description: 'ESKA Bottle Water', price: 3.00, type: 'drink'}),
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
