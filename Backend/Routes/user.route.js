const express = require("express");
const router = express.Router();

const User = require("../Models/User.model.js");

router.get("/", async (req, res, next) => {
  try {
    const result = await User.find({}, {});
    res.send(result);
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = new User(req.body);
    console.log(user);
    const result = await user.save();
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
      return res.status(404).send("User not found");
    }
    console.log(user)
    res.send(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// PUT method for updating a user's details (restricted to own details or System Admin access)
router.put("/:userId", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    
    // Update user's details, excluding the password field
    user.set({
      email: req.body.email,
      name: req.body.name,
      phone: req.body.phone,
      role: req.body.role
    });

    const updatedUser = await user.save();
    res.send(updatedUser);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server Error");
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
    res.status.send("Internal Server Error");
  }
});


// GET all available roles
router.get("/roles", async (req, res, next) => {
  try {
    // Assuming you have a roles collection or some predefined roles
    const roles = ["Admin", "Moderator", "User"];
    res.send(roles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server Error");
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
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
