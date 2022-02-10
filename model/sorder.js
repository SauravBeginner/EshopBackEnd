const mongoose = require("mongoose");
const suborderSchema = mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Suborder", suborderSchema);
