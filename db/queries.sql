-- Querie to retunr dish name and price based on user name
knex.select("orders.id",
          "dishes.name",
          "dishes.price")
    .FROM("orders")
    .JOIN("dishes_orders","orders.id","orders_id")
    .JOIN("dishes","dishes_id","dishes.id")
    .WHERE("orders.name","=","Mike");

-- SELECT orders.id, dishes.name, dishes.price
-- FROM orders JOIN dishes_orders ON orders.id = orders_id
-- JOIN dishes ON dishes_id = dishes.id
-- WHERE orders.name = 'Mike';

-- Querie to return total price for order based on user name
knex.select("orders.name")
    .SUM(dishes.price)
    .FROM("orders")
    .JOIN("dishes_orders","orders.id","orders_id")
    .JOIN("dishes","dishes_id","dishes.id")
    .WHERE("orders.name","=","Mike")
    .groupBy("orders.name");


-- SELECT orders.name, SUM(dishes.price)
-- FROM orders JOIN dishes_orders ON orders.id = orders_id
-- JOIN dishes ON dishes_id = dishes.id
-- WHERE orders.name = 'Mike'
-- GROUP BY orders.name;
