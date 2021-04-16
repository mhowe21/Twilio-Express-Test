const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/voice", (req, res) => {
  res.render("voice");
});
module.exports = router;
