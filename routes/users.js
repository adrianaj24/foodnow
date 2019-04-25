"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        // res.json(results);
    });
    knex.select("orders.id",
              "dishes.name",
              "dishes.price")
        .from("orders")
        .join("dishes_orders","orders.id","orders_id")
        .join("dishes","dishes_id","dishes.id")
        .where("orders.name","=","Mike")
        .then( (moreResults) => {
          res.json(moreResults)
          // console.log(moreResults);
        });
  });

  return router;
}
