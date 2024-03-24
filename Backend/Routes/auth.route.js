const express = require("express");
const router = express.Router();
const User = require("../Models/User.model.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "siamgoodboy";

// router.post("/signup", async (req, res, next)=>{
//     try {
//         const {email, password } = req.body;
//         const hashedPassword = bcryptjs.hashSync(password, 10);
//         const newUser = new User({ email, password: hashedPassword});
//         await newUser.save();
//         res.status(201).json("User created successfully!");
//     } catch (error) {
//         next(error)
//     }
// });

// Type - 1 : Handle Data (Promises)
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const validUser = await User.findOne({email})
    if(!validUser) return next(errorHandle(404, 'User not found!'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if(!validPassword) return next(errorHandle(401, 'Worng credentials!'));
    const token = jwt.sign({id: validUser._id, email: validUser.email, role: validUser.role}, JWT_SECRET)
    const { password: pass, ...rest} = validUser._doc;
    res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest)
    //expires: new Date(Date.now() + 24*60*60*10)}
  } catch (error) {
    next(error);
  }
});

module.exports = router;
