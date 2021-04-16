const router = require("express").Router();

const messages = require("./messages");
const whatsApp = require("./whatsApp");
const voice = require("./voice");

router.use("/messages", messages);
router.use("/whatsapp", whatsApp);
router.use("/voice", voice);

module.exports = router;
