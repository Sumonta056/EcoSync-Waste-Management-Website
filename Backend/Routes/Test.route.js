const express = require("express");
const router = express.Router();

// Type-1 : Query String (http://localhost:3000/test?name=Mac&price=2000)
router.get("/", (req, res, next) => {
  const name = req.query.name;
  const price = req.query.price;
  res.send(req.query);
});

// Type-2 : Route Parameter (http://localhost:3000/test/2)
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  res.send(req.params);
});

// Type-2 : Route Parameter (http://localhost:3000/test/2/sumonta)
router.get("/:id/:name", (req, res, next) => {
  const id = req.params.id;
  res.send(req.params);
});

// Type-3 : JSON Body (http://localhost:3000/test)
router.post("/", (req, res, next) => {
  const products = req.body;
  res.send(`Post Product : ${products.name} ${products.price}`);
});

// Type-4 : URL-encoded (http://localhost:3000/test/urlencoded)
router.post("/urlencoded", (req, res, next) => {
  const products = req.body;
  res.send(`Post Product : ${products.name} ${products.price}`);
});

module.exports = router;
