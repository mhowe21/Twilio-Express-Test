require("dotenv").config("../.env");

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOK;

const twilio = require("twilio")(accountSid, authToken, { logLevel: "debug" });

module.exports = twilio;
