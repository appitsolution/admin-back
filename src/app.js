const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { create } = require("express-handlebars");
const bodyParser = require("body-parser");

const indexRoutes = require("./routes/tasks.routes");

const app = express();

// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  create({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaulLayout: "main",
    extname: ".hbs",
  }).engine
);
app.set("view engine", ".hbs");

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
// routes
app.use(indexRoutes);

// public route
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.status(404).render("404");
});

module.exports = app;
