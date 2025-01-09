const mongoose = require("mongoose");

const clicksSchema = new mongoose.Schema(
  {
    urlId: {},
    city: {
      type: String,
    },
    device: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  { timestamps: true }
);
