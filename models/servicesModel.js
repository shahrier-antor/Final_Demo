const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    serviceType: { type: String, required: true },
    bookedTimeSlots: [
      {
        from: { type: String, required: true },
        to: { type: String, required: true },
      },
    ],

    rate: { type: Number, required: true },
    servicetime: { type: Number, required: true },
  },
  { timestamps: true }
);
const serviceModel = mongoose.model("services", serviceSchema);
module.exports = serviceModel;
