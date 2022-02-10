const express = require("express");
const Customer = require("../model/customer");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash(req.body.password, salt);
  const cpass = await bcrypt.hash(req.body.cpassword, salt);
  const obj = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: pass,
    cpassword: cpass,
  };
  if (pass != cpass) {
    res.json({ err: `Password must be same` });
  } else {
    var result = await Customer.create(obj);
    res.json({ msg: `Form Submitted` });
    console.log(result);
  }
});

router.post("/login", async (req, res) => {
  var result = await Customer.findOne({ email: req.body.email });
  if (result != null) {
    bcrypt.compare(req.body.password, result.password, (err, userData) => {
      if (err) {
        throw err;
      } else {
        if (userData == true) {
          const obj = {
            id: result.id,
            name: result.name,
            email: result.email,
            phone: result.phone,
            password: result.password,
          };

          // creating JWT web-token
          var token = jwt.sign(obj, "myname");
          res.json({ token: token });
          console.log(token);
        } else {
          res.json({ err: `Invalid` });
        }
      }
    });
  } else {
    res.json({ err: `Invalid` });
  }
});

function middleWare(req, res, next) {
  var fullToken = req.headers.authorization;

  if (typeof fullToken != "undefined") {
    var oneTimeToken = fullToken.split(" ")[1];
    req.token = oneTimeToken;
    next();
  } else {
    res.json({ err: "Access Denied" });
  }
}

router.get("/customerdetails", middleWare, (req, res) => {
  jwt.verify(req.token, "myname", (err, custData) => {
    if (err) {
      res.json({ err: "Access Denied" });
    } else {
      res.json(custData);
    }
  });
});

module.exports = router;
