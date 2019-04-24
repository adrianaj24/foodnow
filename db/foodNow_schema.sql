CREATE TABLE IF NOT EXISTS dishes {
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50),
  description VARCHAR(50),
  price NUMERIC
};

CREATE TABLE IF NOT EXISTS orders {
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50),
  phone_number BIGINT
};

CREATE TABLE IF NOT EXISTS dishes_orders {
  orders_id INTEGER,
  dishes_id INTEGER
};

SELECT orders.id, dishes.name, dishes.price
FROM orders JOIN dishes_orders ON orders.id = orders_id
JOIN dishes ON dishes_id = dishes.id
WHERE orders.name = 'Mike';
