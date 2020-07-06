require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const sequelize = require("./sequelize");
require("./association");

const carousel = require("./routes/carousel.route");
const product = require("./routes/product.route");
const product_info = require("./routes/product_info.route");
const lookup = require("./routes/lookup.route");
const service = require("./routes/service.route");
const client = require("./routes/client.route");
const conference = require("./routes/conference.route");
const press = require("./routes/press.route");
const partenaire = require("./routes/partenaire.route");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/services", service);
app.use("/carousels", carousel);
app.use("/products", product);
app.use("/products_info", product_info);
app.use("/admin", lookup);
app.use("/clients", client);
app.use("/conferences", conference);
app.use("/press", press);
app.use("/partenaires", partenaire);

app.get("/", (req, res) => {
  res.status(200).send("Here is our API!");
});

async function main() {
  try {
    await sequelize.sync();
    await sequelize.authenticate();
    console.log("Database succesfully joined");
    app.listen(PORT, (err) => {
      if (err) throw new Error(err.message);
      console.log(`Server is running on htpp://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("Unable to join database", err.message);
  }
}

if (process.env.NODE_ENV !== "test") {
  main();
}

module.exports = app;
