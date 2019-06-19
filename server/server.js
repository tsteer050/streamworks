const express = require("express");
const mongoose = require("mongoose");
const expressGraphQL = require("express-graphql");
const db = require("../config/keys").MONGO_URI;
const schema = require("./schema/schema");
const keys = require("../config/keys");
const { accessKeyId, secretAccessKey } = keys;
const path = require('path');

const cors = require("cors");

const app = express();
app.use(cors());

if (!db) {
  throw new Error("You must provide a string to connect to mLab");
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));


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


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

module.exports = app;
