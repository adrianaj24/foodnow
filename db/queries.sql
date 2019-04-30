-- -- Query to return dish name and price based on user name
knex.select("orders.id",
          "dishes.name",
          "dishes.price")
    .FROM("orders")
    .JOIN("dishes_orders","orders.id","orders_id")
    .JOIN("dishes","dishes_id","dishes.id")
    .WHERE("orders.name","=","Mike");

-- -- Query to return total price for order based on user name
knex.select("orders.name")
    .SUM(dishes.price)
    .FROM("orders")
    .JOIN("dishes_orders","orders.id","orders_id")
    .JOIN("dishes","dishes_id","dishes.id")
    .WHERE("orders.name","=","Mike")
    .groupBy("orders.name");
