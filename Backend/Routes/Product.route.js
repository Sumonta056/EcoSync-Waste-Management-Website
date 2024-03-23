const express = require("express");
const router = express.Router();

const Product = require("../Models/Product.model.js");

router.get("/", async (req, res, next) => {
  try {
    // pass all the results
    // const result = await Product.find();

    // pass only the name and price
    const result = await Product.find({}, { name: 1, _id: 0, price: 1 });
    res.send(result);
  } catch (err) {
    console.log(err.message);
  }
  // next(new Error("Cannot get all products"));
  // res.send("get : all products");
});

// Type - 1 : Handle Data (Promises)
router.post("/", (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  product
    .save()
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Type - 2 : Handle Data (Async Methods)
router.post("/better", async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

router.get("/search/:name", async (req, res, next) => {
  try {
    console.log(req.params.name);
    // pass only the name and price
    const result = await Product.find(
      { name: req.params.name },
      { name: 1, _id: 0, price: 1 }
    );
    res.send(result);
  } catch (err) {
    console.log(err.message);
  }
});

// Search by ID
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    // Type : 1
    // const result = await Product.findById(id);

    // Type : 2
    const result = await Product.findOne({ _id: id });
    res.send(result);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
