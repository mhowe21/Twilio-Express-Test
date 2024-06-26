const router = require("express").Router();
const twilio = require("../../Utils/Twilio");
const fs = require("fs");
const db = require("../../models");
require("dotenv").config("../../.env");
const tNumber = process.env.T_NUMBER;
const servNumber = process.env.MES_SERV;
const statusCallbackWebhook = process.env.STATUS_CALLBACK_URL;

//let replies = [];

router.post("/sms", async (req, res) => {
  let text = req.body.body;
  //let destination = req.body.to;

  // function getDestination(destination) {
  //   return destination ? `${destination}` : `${failOverNumber}`;
  // }

  twilio.messages
    .create({
      body: text,
      from: servNumber,
      to: `${req.body.to}`,
      statusCallback: statusCallbackWebhook,
    })
    .then((message) => {
      console.log(message);

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
      console.log("we hit a message error");
      console.log(err);
    });
});

router.post("/mms", async (req, res) => {
  let text = req.body.body ? req.body.body : "";
  twilio.messages
    .create({
      body: text,
      from: servNumber,
      to: `+${req.body.to}`,
      statusCallback: statusCallbackWebhook,
      ...(req.body.url && { mediaUrl: [`${req.body.url}`] }),
    })
    .then((message) => {
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
      console.log(message);
      res.json(message);
    });
});

// router.get("/recieved", (req, res) => {
//   res.status(200).json(msg);
//   console.log(msg);
// });

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
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
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

// router.get("/replies", async (req, res) => {
//   res.status(200).send(replies);
// });

// webhooks
router.post("/return/hook", async ({ params, body }, res, next) => {
  console.log(body);
  res.status(200).end();
});

router.post("/status/hook", ({ body }, res) => {
  console.log(body);
  res.status(200).end();
});

router.post;
module.exports = router;
