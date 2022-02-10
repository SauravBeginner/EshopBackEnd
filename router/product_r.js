const express = require("express");
const Product = require("../model/product");
// const fs = require("fs");
const router = express.Router();

router.post("/add", async (req, res) => {
  var img = req.files.pimg;
  var imgName = Math.floor(Math.random() * 1000) + img.name;
  img.mv("./public/productImg/" + imgName, async (err) => {
    if (err) {
      throw err;
    } else {
      var obj = {
        name: req.body.name,
        price: req.body.price,
        rating: req.body.rating,
        type: req.body.type,
        pimg: imgName,
      };
      var productData = await Product.create(obj);
      res.json(productData);
      // console.log(productData);
    }
  });
});
router.get("/select/:id", async (req, res) => {
  var result = await Product.findById(req.params.id);
  res.json(result);
  //console.log(result);
});

router.get("/select", async (req, res) => {
  var result = await Product.find();
  res.json(result);
  // console.log(result);
});
router.post("/pdetails", async (req, res) => {
  var result = await Product.findById(req.body.id);
  res.json(result);
});
module.exports = router;
