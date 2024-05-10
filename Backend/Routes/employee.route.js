const express = require("express");
const router = express.Router();

const Employee = require("../Models/Employee.model.js");

router.get("/", async (req, res, next) => {
  try {
    const result = await Employee.find({}, {});
    res.send(result);
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    let employee = req.body;
    const newEmployee = new Employee(employee);
    console.log(newEmployee);
    const result = await newEmployee.save();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

// GET a specific employee's details
router.get("/:employeeId", async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.employeeId);
    if (!employee) {
      return res.send("Employee not found");
    }
    console.log(employee);
    res.send(employee);
  } catch (err) {
    console.log(err.message);
    res.send("Internal Server Error");
  }
});

router.get("/value/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log(userId);

  try {
    const employee = await Employee.find({ managerId: userId }, "wardno gpscoords");
    if (!employee.length) {
      return res.send("No Employee found");
    }
    console.log(employee);
    res.send(employee);
  } catch (err) {
    console.log(err.message);
    res.send("Internal Server Error");
  }
});

router.put("/:employeeId", async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.employeeId);
    if (!employee) {
      return res.send("Employee not found");
    }

    employee.set({
      email: req.body.email || employee.email,
      name: req.body.name || employee.name,
      phone: req.body.phone || employee.phone,
      role: req.body.role || employee.role, // Ensure role is updated correctly
    });
    //console.log("1st:" employee);
    const updatedEmployee = await employee.save();
    console.log(updatedEmployee);
    res.send(updatedEmployee);
  } catch (err) {
    console.log(err.message);
    res.send("Internal Server Error");
  }
});

// DELETE method for deleting a employee (System Admin access)
router.delete("/:employeeId", async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.employeeId);
    if (!employee) {
      return res.send("Employee not found");
    }

    // Use deleteOne() to delete the employee
    await Employee.deleteOne({ _id: req.params.employeeId });
    res.send("Employee deleted successfully");
  } catch (err) {
    console.error(err.message);
    res.send("Internal Server Error");
  }
});

module.exports = router;
