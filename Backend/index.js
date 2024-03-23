// Importing Packages
const express = require("express");
const app = express();
app.use(express.json()); // Handle Json Body
app.use(express.urlencoded({ extended: true })); // Handle URL-encoded data

// Conntection MongoDB
const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://project-restapi.5n25wpo.mongodb.net/?retryWrites=true&w=majority&appName=Project-RESTAPI/`,
    {
      dbName: "Project-RESTAPI",
      user: "sumontasaha80",
      pass: "PeV8ZpACRbAV9Ast",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

// Product routes
const productRouter = require("./Routes/Product.route.js");
app.use("/products", productRouter);

// Test routes
// Query, Params, JSON Body and Urlencoded
const testRoutes = require("./Routes/Test.route.js");
app.use("/test", testRoutes);

// Main Router
app.get("/", (req, res, next) => {
  res.send("Hello World");
});

// Set Error
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.message = "Not Found";
  err.status = 404;
  next(err);
});

// Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

// Start Server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log("MongdDB is available !!");
});
