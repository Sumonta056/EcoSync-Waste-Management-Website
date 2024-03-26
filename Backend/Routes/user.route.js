const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");

const User = require("../Models/User.model.js");

router.get("/", async (req, res, next) => {
  try {
    const result = await User.find({}, {});
    res.send(result);
  } catch (err) {
    console.log(err.message);
  }
});
router.get("/sts-manager", async (req, res, next) => {
  try {
    const result = await User.find({ role: 'STS-MANAGER' });
    res.send(result);
  } catch (err) {
    console.log(err.message);
  }
});
router.get("/landfill-manager", async (req, res, next) => {
  try {
    const result = await User.find({ role: 'LANDFILL MANAGER' });
    res.send(result);
  } catch (err) {
    console.log(err.message);
  }
});
router.post("/", async (req, res, next) => {
  try {
    let user = req.body;
    if (user.password) {
      const hashedPassword = bcryptjs.hashSync(user.password, 10);
      user.password = hashedPassword;
    }
    const newUser = new User(user);
    console.log(newUser);
    const result = await newUser.save();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

// GET a specific user's details
router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.send("User not found");
    }
    console.log(user);
    res.send(user);
  } catch (err) {
    console.log(err.message);
    res.send("Internal Server Error");
  }
});

router.put("/:userId", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.send("User not found");
    }

    user.set({
      email: req.body.email || user.email,
      name: req.body.name || user.name,
      phone: req.body.phone || user.phone,
      role: req.body.role || user.role, // Ensure role is updated correctly
    });
    //console.log("1st:" user);
    const updatedUser = await user.save();
    console.log(updatedUser);
    res.send(updatedUser);
  } catch (err) {
    console.log(err.message);
    res.send("Internal Server Error");
  }
});


// DELETE method for deleting a user (System Admin access)
router.delete("/:userId", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.send("User not found");
    }

    // Use deleteOne() to delete the user
    await User.deleteOne({ _id: req.params.userId });
    res.send("User deleted successfully");
  } catch (err) {
    console.error(err.message);
    res.send("Internal Server Error");
  }
});


// GET all available roles
router.get("/roles", async (req, res, next) => {
  try {
    // Fetch distinct roles from the user collection
    const roles = await User.distinct("role");
    res.json(roles);
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// PUT method for updating a user's roles (System Admin access)
router.put("/:userId/roles", async (req, res, next) => {
  try {
    // Logic to update user roles, restricted to System Admin access
    // Implement your authorization logic here
    res.send("User roles updated successfully");
  } catch (err) {
    console.log(err.message);
    res.send("Internal Server Error");
  }
});



module.exports = router;
