const mongoose = require("mongoose");

const UrlsSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
    customUrl: {
      type: String,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    qr: {
      type: String,
    },
  },
  { timestamps: true }
);

const Urls = mongoose.model("Url", UrlsSchema);
module.exports = Urls;
