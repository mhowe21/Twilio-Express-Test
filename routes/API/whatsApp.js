const router = require("express").Router();
const MessagingResponse = require("twilio/lib/twiml/MessagingResponse");
const client = require("../../Utils/Twilio");
const twilio = require("../../Utils/Twilio");
require("dotenv").config("../../.env");
const wNumber = process.env.MES_SERV;
const statusCallbackWebhook = process.env.STATUS_CALLBACK_URL;

router.post("/message", (req, res) => {
  twilio.messages
    .create({
      from: `${wNumber}`,
      body: req.body.body,
      statusCallback: statusCallbackWebhook,
      to: `whatsapp:+${req.body.to}`,
      ...(req.body.url && { mediaUrl: [`${req.body.url}`] }),
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.post("/hook/recieved", (req, res) => {
  let body = req.body;
  console.log(body);
  res.status(200).end();
});

router.post("/hook/status", (req, res) => {
  let body = req.body;
  console.log(body);
  res.status(200).end();
});

module.exports = router;
