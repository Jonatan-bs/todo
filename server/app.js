var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require("cors");

require("./models/user");
const session = require("express-session");

var apiRouter = require("./routes/api");

var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "aaahhhhh",
    resave: true,
    saveUninitialized: true,
    secure: false
  })
);

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
// app.use((req, res, next) => {
//   if (req.cookies.user_id && !req.session.user) {
//     res.clearCookie("user_id");
//   }
//   next();
// });

app.use("/", apiRouter);

mongoose.connect("mongodb://localhost:27017/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

module.exports = app;
