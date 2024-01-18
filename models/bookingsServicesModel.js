const mongoose = require("mongoose");

const bookingServicesSchema = new mongoose.Schema(
  {
    service: { type: mongoose.Schema.Types.ObjectID, ref: "services" },
    user: { type: mongoose.Schema.Types.ObjectID, ref: "registrations" },
    bookedTimeSlots: {
      from: { type: String },
      to: { type: String },
    },
    totalHours: { type: Number },
    totalAmount: { type: Number },
    transactionId: { type: String },
    overallTestRequired: { type: Boolean },
    premiumServicesRequired: { type: Boolean },
  },
  { timestamps: true }
);

const bookingServicesModel = mongoose.model(
  "servicesbookings",
  bookingServicesSchema
);

module.exports = bookingServicesModel;