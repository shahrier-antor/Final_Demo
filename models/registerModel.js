// Basic registration model

const mongoose = require("mongoose");

const RegSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  // cpassword :{type:String , required: true}
});

const RegModel = mongoose.model("Registrations", RegSchema);

module.exports = RegModel;
