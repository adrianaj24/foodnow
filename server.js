"use strict";

require('dotenv').config();

const cookieSession = require('cookie-session');
const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const http = require('http');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger = require('knex-logger');

// Twilio API resources
const accountSid = 'AC3e045c2e3e8c35dcd420edd9c8f49d97';
const authToken = '507c961f2758f529c64a79b96384995e';
const client = require('twilio')(accountSid, authToken);

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

app.use(cookieSession({
  name: 'session',
  keys: ["monkey", "star"]
}));

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
// Home Page
app.get("/", (req, res) => {
  res.render("index")
});

// app.use("/api/users", usersRoutes(knex));
// Mount all resource routes
app.get("/dishes", (req, res) => {
  console.log('getting dishes route')
  knex.select("dishes.id","dishes.name","dishes.description","dishes.price", "dishes.type")
        .from("dishes")
        // req.params.type
        // .where("dishes.type","=","main")
        .then( (moreResults) => {
          res.json(moreResults)
        })
});

// order in progress
app.get("/summary", (req, res) => {

  res.render("summary")
});

app.get ("/cart", (req, res) => {
  console.log("This is cart: ", JSON.stringify(localStorage.getItem('cart')));
})

// checkout order
app.post("/checkout", (req, res) => {
  var phonenumber = req.body.phonenumber 
  console.log("this is checkout", req.body);

  // Message to be sent to the restaurant
  // client.messages.create({
  //    body: 'You received a new order for : Item A, Item B, etc. How will it take for the order to be ready?',
  //    from: '+16477993850',
  //    to: '+16478714743',
  //    statusCallback: 'https://fc89f917.ngrok.io/smsstatus'
  //  })
  //               .then(message => console.log("This is message from checkout: "));


  res.render("checkout")
});

app.post("/smsstatus", (req, res) => {
  console.log("This is the sms status: ",req.body);
});

app.get('/checkout', (req, res) => {
  // console.log(req.body);
  console.log("pika pika")
  // res.send("checkout");
});

app.post("/delete", (req, res) => {
  res.redirect("index");
});

// TWILIO API
app.post('/sms', (req, res) => {
  //Message received from the restaurant
  console.log("This is the req: ",req.body.Body);
  const eta = req.body.Body;
  // Sending message to the client with the ETA

  const promise = client.messages.create({
     body: `Your order will be ready in ${eta} minutes`,
     from: '+16477993850',
     to: '+16478714743',
      statusCallback: 'https://fc89f917.ngrok.io/smsstatus'
   })
  console.log("this is promise: ", promise);
  promise.then(message => console.log("This is message from checkout: ",message));
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
