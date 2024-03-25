// Importing Packages
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json()); // Handle Json Body
app.use(express.urlencoded({ extended: true })); // Handle URL-encoded data
app.use(cors()); // allow cross origin policy

// Swagger For API Documentation
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Conntection MongoDB
const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://wastemanagement.ug8d6fr.mongodb.net/?retryWrites=true&w=majority&appName=WasteManagement/`,
    {
      dbName: "WasteManagement",
      user: "promimojumder8",
      pass: "aXipRG6t3JTC2dpG",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

// Product routes
const productRouter = require("./Routes/Product.route.js");
app.use("/products", productRouter);

// User routes
const userRouter = require("./Routes/user.route.js");
app.use("/user", userRouter);

// role routes
const roleRouter = require("./Routes/user.route.js");
app.use("/roles", userRouter);

// Vehicle routes
const vehicleRouter = require("./Routes/vehicle.route.js");
app.use("/vehicle", vehicleRouter);

// Waste transfer from STS to Landfill routes
const transferRouter = require("./Routes/transfer.route.js");
app.use("/transfer", transferRouter);

// Main Router
app.get("/", (req, res, next) => {
  res.send("Hello World");
});

//Authentication Router
const authRouter = require("./Routes/auth.route.js");
app.use("/auth", authRouter);

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
