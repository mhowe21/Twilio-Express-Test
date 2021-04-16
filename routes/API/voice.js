const router = require("express").Router();
const twilio = require("../../Utils/Twilio");
require("dotenv").config("../../.env");
const VoiceResponse = require("../../Utils/voiceresponse");
const tNumber = process.env.T_NUMBER;

router.post("/call_status", (req, res) => {
  res.status(200).json("Call status received");
  console.log(res);
});

router.post("/outbound_call/:number", ({ params, body }, res) => {
  twilio.calls
    .create({
      twiml:
        "<Response><Say>Hello! This is a test call from Mason's Sandbox. Please disregard this message.</Say></Response>",
      to: `+${params.number}`,
      from: tNumber,
    })
    .then((data) => {
      console.log(data);
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/incomming_call", ({ params, body }, res) => {
  const twiml = new VoiceResponse();
  twiml.say(
    { voice: "Polly.Matthew" },
    `You have reached Mason's Sandbox. Nothing fun is currently happning here. So here is this Hey witch doctor, give us the magic words
    All right, you go ooh ee ooh ah ah ting tang walla walla bing bang
    All right
    Ooh ee ooh ah ah ting tang walla walla bing bang
    Ooh ee ooh ah ah ting tang walla walla bang bang
    Ooh ee ooh ah ah ting tang walla walla bing bang
    Ooh ee ooh ah ah ting tang walla walla bang bang
    Doh, doh, doh, doh, doh, doh, doh
    Ooh ee ooh ah ah ting tang walla walla bing bang
    Ooh ee ooh ah ah ting tang walla walla bang bang
    Ooh ee ooh ah ah ting tang walla walla bing bang
    Ooh ee ooh ah ah ting ting walla walla bang bang
    Doh, doh, doh, doh
    I told the witch doctor, I was in love with you
    Doh, doh, doh, doh
    I told the witch doctor, I was in love with you
    Doh, doh, doh, doh
    And than the witch doctor, he told me what to do
    He told me
    Ooh ee ooh…`
  );

  // Render the response as XML in reply to the webhook request
  res.type("text/xml");
  res.send(twiml.toString());
});

module.exports = router;
