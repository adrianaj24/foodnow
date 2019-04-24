CREATE TABLE IF NOT EXISTS dishes {
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50),
  description VARCHAR(50),
  price REAL
};

CREATE TABLE IF NOT EXISTS orders {
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50),
  phone_number INTEGER
};

CREATE TABLE IF NOT EXISTS dishes_order {
  orders_id INTEGER,
  dishes_id
};
