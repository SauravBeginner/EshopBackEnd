const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const expreessFileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;

const customer_r = require("./router/customer_r");
const product_r = require("./router/product_r");
const cart_r = require("./router/cart_r");
mongoose.connect(
  "mongodb+srv://saurav:Ow8QC6Rbqqgee3jq@cluster0.aofdk.mongodb.net/ecommerce?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useUnifiedTopology: true }
);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(expreessFileUpload());

app.get("/", (req, res) => {
  res.send(`Hello Server!`);
});

app.use("/customer", customer_r);
app.use("/product", product_r);
app.use("/cart", cart_r);
app.listen(PORT, (err) => {
  console.log(`Server running at ${PORT}`);
});
