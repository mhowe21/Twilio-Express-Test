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
        "http://mhowetesting.com:4570/api/v1/whatsapp/hook/status",
      to: `whatsapp:+${req.body.to}`,
      ...(req.body.url && { mediaUrl: [`${req.body.url}`] }),

      //mediaUrl: [mediaPreset],
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

router.post("/hook/recieved", (req, res) => {
  let body = req.body;
  console.log(body);
  res.status(200).json("message received");
});

router.post("/hook/status", (req, res) => {
  let body = req.body;
  console.log(body);
  res.status(200).json("status received");
});

module.exports = router;
