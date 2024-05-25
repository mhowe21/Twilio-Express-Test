const router = require("express").Router();
const { text } = require("express");
const twilio = require("../../Utils/Twilio");
const db = require("../../models");
require("dotenv").config("../../.env");
const servNumber = process.env.MES_SERV;
const statusCallbackWebhook = process.env.STATUS_CALLBACK_URL;

router.post("", async (req, res) => {
  let text = req.body.body;

  twilio.messages
    .create({
      body: text,
      from: servNumber,
      to: `${req.body.to}`,
      statusCallback: statusCallbackWebhook,
      ...(req.body.url && { mediaUrl: [`${req.body.url}`] }),
    })
    .then((message) => {
      console.log(message);
      res.json(message);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post;
module.exports = router;
