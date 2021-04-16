const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || 4570;

// use view engine. Handlebars for this one. Maybe ejs later or we could use react.
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// use options
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("./routes"));
app.use(express.static("./public"));

//set mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/TwilioDemo", {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("debug", true);

app.listen(PORT, () => {
  console.log(`Now listening on port: ${PORT}`);
});
