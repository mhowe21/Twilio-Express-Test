const { Schema, model, Types } = require("mongoose");

const statusSchema = new Schema(
  {
    SmsSid: {
      type: String,
    },
    SmsStatus: {
      type: String,
    },
    MessageStatus: {
      type: String,
    },
    To: {
      type: String,
    },
    MessageSid: {
      type: String,
    },
    AccountSid: {
      type: String,
    },
    From: {
      type: String,
    },
    ApiVersion: {
      type: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Status = model("Status", statusSchema);

module.exports = Status;
