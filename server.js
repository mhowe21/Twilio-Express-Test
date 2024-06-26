require("dotenv").config(".env");
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const fs = require("fs");
const https = require("https");

const PORT = process.env.PORT || 4570;
//  use handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// use options
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("./routes"));
app.use(express.static("./public"));

//set mongoose

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/TwilioDemo", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    mongoose.set("debug", true);
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });

// attempt to load SSL files and launch https server if found
try {
  const options = {
    key: fs.readFileSync("SSL/Private Key.txt"),
    cert: fs.readFileSync("SSL/mhowetesting_com/mhowetesting_com.crt"),
  };
  //secure server.
  https.createServer(options, app).listen(PORT, () => {
    console.log(`Live on port + ${PORT}`);
  });
} catch (err) {
  console.log(err);
  // non secure local server
  app.listen(3080, () => {
    console.log(`Non secure server on port: 3080`);
  });
}
