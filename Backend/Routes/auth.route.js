const express = require("express");
const router = express.Router();
const User = require("../Models/User.model.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "siamgoodboy";
const nodemailer = require("nodemailer");
const e = require("express");

function errorHandle(status, msg) {
  let err = new Error(msg);
  err.status = status;
  return err;
}

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
});

// Type - 1 : Handle Data (Promises)
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandle(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandle(401, "Wrong credentials!"));
    const token = jwt.sign(
      { id: validUser._id, email: validUser.email, role: validUser.role },
      JWT_SECRET
    );
    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: false })
      .status(200)
      .json({ access_token: token });
  } catch (error) {
    next(error);
  }
});

// router.post('/reset-password/initiate', async (req, res, next) => {
//   // Your code here
//   const {email} = req.body;
//   try{
//     const oldUser = await User.findOne({ email });
//     if(!oldUser) return next(errorHandle(404, "User not found!"));
//     const secret = JWT_SECRET + oldUser.password;
//     const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "5m" });
//     const link = `http://localhost:3000/auth/reset-password/confirm/${oldUser._id}/${token}`;
//     console.log(link);

//   }catch(error){
//     next(error);
//   }
// });

// router.get('/reset-password/confirm/:id/:token', async (req, res, next) => {
//   // Your code here
//   const { id, token } = req.params;
//   console.log(req.params);
//   // res.send("Reset Password");
//   const oldUser = await User.findOne({ _id: id });
//   if(!oldUser) return next(errorHandle(404, "User not found!"));
//   const secret = JWT_SECRET + oldUser.password;
//   try{
//     const payload = jwt.verify(token, secret);
//     res.status(200).json({ email: payload.email, message: "Verified" });
//   }catch (error){
//     res.status(401).json({ message: "Not Verified" });
//   }
// });

function sendEmail({ recipient_email, OTP }) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "siam.ridwan60@gmail.com",
        pass: "yzxn mfrr zqft ajsm",
      },
    });

    const mail_configs = {
      from: "siam.ridwan60@gmail.com",
      to: recipient_email,
      subject: "Team EcoSync PASSWORD RECOVERY",
      html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen - OTP Email Template</title>
  

</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Team Eco-Sync</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing Team EcoSync. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />Team EcoSync</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Team EcoSync</p>
      <p>Shahjalal University of Science and Technology</p>
      <p>Sylhet</p>
    </div>
  </div>
</div>
<!-- partial -->
  
</body>
</html>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
}

router.post("/reset-password/initiate", async (req, res, next) => {
  const { recipient_email } = req.body;
  const oldUser = await User.findOne({ email: recipient_email });
  if (!oldUser) {
    return res.json({ error: "User not found!" });
  } else {
    sendEmail(req.body)
      .then((response) => res.send("found"))
      .catch((error) => res.status(500).send(error.message));
  }
});

router.post("/change-password", async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    // console.log(oldUser);
    if (!oldUser) return next(errorHandle(404, "User not found!"));
    // console.log(oldUser);
    if (password !== confirmPassword)
      return next(errorHandle(400, "Passwords do not match!"));
    console.log(oldUser);
    oldUser.password = bcryptjs.hashSync(password, 10);

    await oldUser.save();
    res.status(200).json("Password updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
