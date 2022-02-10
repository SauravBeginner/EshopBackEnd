const mongoose = require("mongoose");
const morderSchema = mongoose.Schema({
  customerId: {
    type: String,
    required: true,
  },
  bname: {
    type: String,
    required: true,
  },
  baddress: {
    type: String,
    required: true,
  },
  bphone: {
    type: String,
    required: true,
  },
  sname: {
    type: String,
    required: true,
  },
  saddress: {
    type: String,
    required: true,
  },
  sphone: {
    type: String,
    required: true,
  },
  orderId: {
    type: Number,
  },
  paymentID: {
    type: String,
  },
});

module.exports = mongoose.model("Morder", morderSchema);
