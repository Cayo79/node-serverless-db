const serverless = require("serverless-http");
const express = require("express");
import * as bodyParser from 'body-parser'
import { userRouter } from './src/routes/user.routes'
import { db } from './src/instances/db.config'

const app = express();

try {
  db.authenticate()
  console.log('Database online')
} catch (error) {
  throw new Error( error)
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hola from root!",
  });
});

app.use("/usuarios", userRouter)

app.listen(function(err) {
  if (err) console.log("Error in server setup")
})

module.exports.handler = serverless(app);
