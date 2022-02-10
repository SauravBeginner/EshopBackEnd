const express = require("express");
const Cart = require("../model/cart");
const customer = require("../model/customer");
const product = require("../model/product");
const morder = require("../model/morder");
const sorder = require("../model/sorder");
const cart = require("../model/cart");

const router = express.Router();

router.post("/addCart", async (req, res) => {
  var total = Number(req.body.price) * Number(req.body.qty);

  var totalProduct = await Cart.findOne({
    productId: req.body.pid,
    customerId: req.body.cid,
  });

  if (totalProduct == null) {
    var obj = {
      productId: req.body.pid,
      customerId: req.body.cid,
      price: req.body.price,
      quantity: req.body.qty,
      totalPrice: total,
    };
    var data = await Cart.create(obj);
    res.json({ msg: "Product added successfully" });
    console.log(data);
  } else {
    updatedQuantity = Number(req.body.qty) + Number(totalProduct.quantity);
    var obj = {
      quantity: updatedQuantity,
    };
    var data = await Cart.findByIdAndUpdate(totalProduct._id, obj);
    res.json({ msg: "Product updated successfully" });
    console.log(updatedQuantity);
  }
});

router.post("/viewcart", async (req, res) => {
  //{ customerId: req.body.cid }
  var x = await Cart.find();
  var arr = [];
  var gt = 0;
  for (var i = 0; i < x.length; i++) {
    var p = await product.findOne({ _id: x[i].productId });
    var obj = {
      id: x[i]._id,
      pname: p.name,
      pimg: p.pimg,
      price: x[i].price,
      quantity: x[i].quantity,
      totalPrice: x[i].totalPrice,
    };
    gt = gt + Number(x[i].totalPrice);
    arr.push(obj);
  }
  res.json({ prod: arr, gt: gt });
});

router.post("/delete", async (req, res) => {
  var deletedItem = await Cart.findByIdAndDelete(req.body.id);
  res.json({ msg: "Deleted" });
});

router.post("/update", async (req, res) => {
  var total = Number(req.body.qty) * Number(req.body.price);
  var obj = {
    quantity: req.body.qty,
    totalPrice: total,
  };
  var updatedItem = await Cart.findByIdAndUpdate(req.body.id, obj);
  res.json({ msg: "updated" });
});

router.post("/morder", async (req, res) => {
  var resl = await morder.find().sort({ orderId: -1 });
  if (resl.length > 0) {
    var oid = Number(resl[0].orderId) + 1;
  } else {
    var oid = 1;
  }

  var obj = {
    customerId: req.body.cid,
    bname: req.body.bname,
    baddress: req.body.baddress,
    bphone: req.body.bphone,
    sname: req.body.sname,
    saddress: req.body.saddress,
    sphone: req.body.sphone,
    orderId: oid,
    paymentID: "",
  };
  await morder.create(obj);

  var totalamnt = 0;

  var cartp = await cart.find({ customerId: req.body.cid });
  for (var i = 0; i < cartp.length; i++) {
    totalamnt = Number(totalamnt) + Number(cartp[i].totalPrice);
    objs = {
      productId: cartp[i].productId,
      quantity: cartp[i].quantity,
      price: cartp[i].price,
      totalPrice: cartp[i].totalPrice,
      orderId: oid,
    };
    await sorder.create(objs);

    await cart.findByIdAndDelete(cartp[i]._id);
  }

  res.json({ orderId: oid, totalamnt: totalamnt, bname: req.body.bname });
});

router.post("/viewsorder", async (req, res) => {
  //{ customerId: req.body.cid }
  console.log(req.body.cid);
  var morderk = await morder.find({ customerId: req.body.cid });
  var arr = [];
  for (var k = 0; k < morderk.length; k++) {
    var x = await sorder.find({ orderId: morderk[k].orderId });

    var gt = 0;
    for (var i = 0; i < x.length; i++) {
      var p = await product.findOne({ _id: x[i].productId });
      var obj = {
        id: x[i]._id,
        pname: p.name,
        pimg: p.pimg,
        price: x[i].price,
        quantity: x[i].quantity,
        totalPrice: x[i].totalPrice,
        orderId: x[i].orderId,
      };

      arr.push(obj);
    }
  }
  res.json(arr);
});

router.get("/totalorder", async (req, res) => {
  //{ customerId: req.body.cid }
  var x = await Cart.find();
  var to = 0;
  for (var i = 0; i < x.length; i++) {
    to = to + Number(x[i].quantity);
  }
  res.json({ to: to });
});

router.post("/payment", async (req, res) => {
  if (req.body.payment_id != null && req.body.oid != null) {
    var mo = await morder.findOne({ orderId: req.body.oid });
    var obj = {
      paymentID: req.body.payment_id,
    };
    await morder.findByIdAndUpdate(mo._id, obj);

    res.json({ msg: "paid" });
  }
  res.json({ msg: "processing" });
});

module.exports = router;
