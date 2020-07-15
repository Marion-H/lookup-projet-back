require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
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
const sendMail = require('./routes/sendMail.route')
const Lookup = require("./model/lookUp.model");

const app = express();

const PORT = process.env.PORT || 8000;
const env = process.env.NODE_ENV;

const whitelist = process.env.CLIENT_URLS.split(", ");

app.use(
  cors(
    {
    origin: function (origin, callback) {
      if (
        whitelist.indexOf(origin) !== -1 ||
        (env !== "production" && !origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }
  )
);
if (process.env.NODE_ENV !== "test") {
  const logStyle = {
    production: "short",
    development: "dev",
  };
  app.use(morgan(logStyle[env]));
}
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
app.use("/sendMail", sendMail)

app.get("/", (req, res) => {
  res.status(200).send("Here is our API!");
});

async function main() {
  try {
    await sequelize.sync({ alter: true });
    await sequelize.authenticate();
    await Lookup.findCreateFind({
      where: { email: "antonin@lookup.fr", password: "toto" },
    });
    console.log("Database succesfully joined");
    app.listen(PORT, (err) => {
      if (err) throw new Error(err.message);
      env !== "production" &&
        console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("Unable to join database", err.message);
  }
}

if (process.env.NODE_ENV !== "test") {
  main();
}

module.exports = app;

// sequelize
//     .sync()
//     .then(() => {
//       return sequelize.authenticate();
//     })
//     .then(() => {
//       // we create two roles only if they don't exists
//       return Promise.all([
//         Role.findCreateFind({ where: { label: "ADMIN" } }),
//         Role.findCreateFind({ where: { label: "USER" } }),
//       ]);
//     })
//     .then(([admin, user]) => {
//       // then we create two users for testing
//       return Promise.all([
//         User.findCreateFind({
//           where: { email: "admin@dev.com" },
//           defaults: {
//             password: "admin",
//             firstName: "admin",
//             lastName: "admin",
//             localisation: "admin",
//             country: "France",
//             phone_number: 0656565656,
//             RoleId: admin[0].id,
//           },
//         }),
//         User.findCreateFind({
//           where: { email: "user@dev.com" },
//           defaults: {
//             password: "user",
//             firstName: "user",
//             lastName: "user",
//             localisation: "user",
//             country: "France",
//             phone_number: 0656565656,
//             RoleId: user[0].id,
//           },
//         }),
//       ]);
//     })
//     .then(() => {
//       app.listen(port, (err) => {
//         if (err) {
//           throw new Error("Something really bad happened ...");
//         }
//         console.log(`Server is listening on ${port}`);
//       });
//     })
//     .catch((err) => {
//       console.log("unable to join database", err.message);
//     });
