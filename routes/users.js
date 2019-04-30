"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex.select("dishes.name","dishes.description","dishes.price")
        .from("dishes")
        .where("dishes.type","=","main")
        .then( (moreResults) => {
        });
  });

  return router;
}
