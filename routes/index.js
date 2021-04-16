const router = require("express").Router();
const apiRoutes = require("./API");
const pageRouts = require("./pages");

router.use("/api/v1", apiRoutes);
router.use("", pageRouts);

module.exports = router;
