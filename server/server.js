const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressGraphQL = require("express-graphql");
const db = require("../config/keys").MONGO_URI;
const models = require('../server/models/index');
const schema = require('./schema/schema');


const app = express();

if (!db) {
  throw new Error("You must provide a string to connect to mLab");
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

app.use(bodyParser.json());



module.exports = app;