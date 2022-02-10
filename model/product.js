const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  pimg: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
