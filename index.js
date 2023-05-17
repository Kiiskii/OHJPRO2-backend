const express = require("express");

const bodyParser = require("body-parser");

const authRoutes = require("./src/routes/auth");

const favoritesRoutes = require("./src/routes/favorites");

const errorController = require("./src/controllers/error");

const app = express();

const ports = process.env.PORT || 3000;
// const ports = process.env.//ohjpro2:IaR4cimmA4oKt10MheuAxGZae4x0tL2e@dpg-chibp53hp8u7g2fiq2o0-a/ohjpro2_0o74;
// const ports = process.env.//ohjpro2:IaR4cimmA4oKt10MheuAxGZae4x0tL2e@dpg-chibp53hp8u7g2fiq2o0-a.frankfurt-postgres.render.com/ohjpro2_0o74;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const pool = require("./src/util/database");

pool.connect((err, client, done) => {
  if (err) throw err;
  console.log("Connected to database");
});

app.use("/auth", authRoutes);

app.use("/favorites", favoritesRoutes);

app.use(errorController.get404);

app.use(errorController.get500);

app.listen(ports, () => console.log(`listening on port ${ports}`));


