const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
  customerId: {
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

module.exports = mongoose.model("Cart", cartSchema);
