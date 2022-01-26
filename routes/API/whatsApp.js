const router = require("express").Router();
const MessagingResponse = require("twilio/lib/twiml/MessagingResponse");
const client = require("../../Utils/Twilio");
const twilio = require("../../Utils/Twilio");
require("dotenv").config("../../.env");
const wNumber = "+14155238886";

router.post("/message", (req, res) => {
  //res.json("congrats you found the whatsApp endpoint");
  let mediaPreset = req.body.url;

  if (mediaPreset) {
    twilio.messages
      .create({
        from: `whatsapp:${wNumber}`,
        body: req.body.body,
        statusCallback:
          "http://mhowetesting.com:4570/api/v1/whatsapp/hook/status",
        ...(mediaPreset && { mediaUrl: [`${req.body.url}`] }),
        to: `whatsapp:+${req.body.to}`,
        mediaUrl: [mediaPreset],
      })
      .then((data) => {
        console.log(data);
        res.json(data);
      });
  } else {
    twilio.messages
      .create({
        from: `whatsapp:${wNumber}`,
        body: req.body.body,
        statusCallback:
          "http://mhowetesting.com:4570/api/v1/whatsapp/hook/status",
        ...(mediaPreset && { mediaUrl: [`${req.body.url}`] }),
        to: `whatsapp:+${req.body.to}`,
      })
      .then((data) => {
        console.log(data);
        res.json(data);
      });
  }
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
