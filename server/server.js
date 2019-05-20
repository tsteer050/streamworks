const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressGraphQL = require("express-graphql");
const db = require("../config/keys").MONGO_URI;
const models = require('../server/models/index');
const schema = require('./schema/schema');
<<<<<<< HEAD
const cors = require('cors');

const app = express();
app.use(cors());
=======


const app = express();
>>>>>>> backend-auth

if (!db) {
  throw new Error("You must provide a string to connect to mLab");
}

<<<<<<< HEAD


app.use(bodyParser.json());

app.use(
  "/graphql",
  expressGraphQL(req => {
    return {
      schema,
      context: {
        token: req.headers.authorization
      },
      graphiql: true
    };
  })
);

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));
=======
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

>>>>>>> backend-auth


module.exports = app;