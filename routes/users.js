"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    // knex
    //   .select("*")
    //   .from("users")
    //   .then((results) => {
        // res.json(results);
    // });
    knex.select("dishes.name","dishes.description","dishes.price")
        .from("dishes")
        .where("dishes.type","=","main")
        .then( (moreResults) => {
          res.json(moreResults)
          console.log("Result from query: ",moreResults);
        });
  });

  return router;
}
