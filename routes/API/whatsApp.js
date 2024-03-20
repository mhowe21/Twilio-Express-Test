const router = require("express").Router();
const MessagingResponse = require("twilio/lib/twiml/MessagingResponse");
const client = require("../../Utils/Twilio");
const twilio = require("../../Utils/Twilio");
require("dotenv").config("../../.env");
const wNumber = process.env.WA_NUMBER;

router.post("/message", (req, res) => {
  twilio.messages
    .create({
      from: `whatsapp:${wNumber}`,
      body: req.body.body,
      statusCallback:
        "https://webhook.site/664e0882-73b3-4c9f-b134-0f5c98a1db74",
      to: `whatsapp:+${req.body.to}`,
      ...(req.body.url && { mediaUrl: [`${req.body.url}`] }),

      //mediaUrl: [mediaPreset],
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
