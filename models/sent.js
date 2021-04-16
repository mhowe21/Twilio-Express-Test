const { Schema, model, Types } = require("mongoose");

const sentSchema = new Schema(
  {
    Id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    body: {
      type: String,
    },
    numSegments: {
      type: Number,
    },
    direction: {
      type: String,
    },
    from: {
      type: String,
    },
    to: {
      type: String,
    },
    price: {
      type: String,
    },
    errorMessage: {
      type: String,
    },
    uri: {
      type: String,
    },
    accountSid: {
      type: String,
    },
    numMedia: {
      type: Number,
    },
    messagingServiceSid: {
      type: String,
    },
    sid: {
      type: String,
    },
    dateCreated: {
      type: String,
    },
    errorCode: {
      type: String,
    },
    priceUnit: {
      type: String,
    },
    apiVersion: {
      type: String,
    },
    subresourcesUris: {
      type: Object,
    },
    status: [
      {
        type: String,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Sent = model("Sent", sentSchema);
module.exports = Sent;
