const router = require("express").Router();
const twilio = require("../../Utils/Twilio");
const fs = require("fs");
const db = require("../../models");
require("dotenv").config("../../.env");
const tNumber = process.env.T_NUMBER;
const servNumber = process.env.MES_SERV;
const failOverNumber = process.env.FAIL_OVER_NUMBER;

router.post("/sms", async (req, res) => {
  let text = req.body.body;
  //let destination = req.body.to;

  function getDestination(destination) {
    return destination ? `${destination}` : `${failOverNumber}`;
  }

  twilio.messages
    .create({
      body: text,
      from: servNumber,
      to: getDestination(req.body.to),
      statusCallback:
        "http://Alfred.mhowetesting.com:4570/api/v1/messages/status/hook",
    })
    .then((message) => {
      console.log(message);
      //console.log(message.sid);
      db.Sent.create({
        body: message.body,
        numSegments: message.numSegments,
        direction: message.direction,
        from: message.from,
        to: message.to,
        price: message.price,
        uri: message.uri,
        errorMessage: message.errorMessage,
        accountSid: message.accountSid,
        numMedia: message.numSegments,
        messagingServiceSid: message.messagingServiceSid,
        sid: message.sid,
        dateCreated: message.dateCreated,
        errorCode: message.errorCode,
        priceUnit: message.priceUnit,
        apiVersion: message.apiVersion,
        subresourcesUris: message.subresourceUris,
        $push: { status: message.status },
      })
        .then((dbData) => {
          console.log(dbData);
        })
        .catch((err) => {
          console.log(err);
        });

      res.json(message);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/mms", async (req, res) => {
  twilio.messages
    .create({
      body: req.body.body,
      from: tNumber,
      mediaUrl: [`${req.body.url}`],
      to: req.body.to,
      statusCallback:
        "http://Alfred.mhowetesting.com:4570/api/v1/messages/status/hook",
    })
    .then((data) => {
      console.log(message);
      res.json(data);
    });
});

router.get("/recieved", (req, res) => {
  res.status(200).json(msg);
  console.log(msg);
});

router.post("/message_service", (req, res) => {
  twilio.messages
    .create({
      body: req.body.body,
      messagingServiceSid: servNumber,
      to: req.body.to,
    })
    .then((data) => {
      console.log(data);
      res.status(201).json(data);
    });
});

router.get("/number/lookup", async (req, res) => {
  twilio.lookups.v1
    .phoneNumbers(req.body.to)
    .fetch({ type: ["carrier", "caller-name"] })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

// webhooks
router.post("/return/hook", async ({ params, body }, res, next) => {
  console.log(body);
  //msg.push(req.body);
  res.status(200).json("Message Recieved");
});

router.post("/status/hook", ({ body }, res) => {
  console.log(body);
  res.status(200).json("status recieved");
});

router.post;
module.exports = router;
