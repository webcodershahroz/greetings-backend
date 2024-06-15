const express = require("express");
const router = express.Router();
const User = require("../models/User");
const generateToken = require("../config/jwt");
const bcrypt = require("bcryptjs");

//Post API to register a new user

router.post("/existsUsername", async (req, res) => {
  try {
    const { username } = req.body;
    let usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.json({ success: 0, message: "User Already Exists" });
    } else{
      return res.json({ success: 1, message: `${username} is available` });
    }

  } catch (error) {
    console.log(error);
  }
});

router.post("/existsEmail", async (req, res) => {
  try {
    const { email } = req.body;
    let emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.json({ success: 0, message: `${email} already exists` });
    } else{
      return res.json({ success: 1, message: `${email} is available` });
    }

  } catch (error) {
    console.log(error);
  }
});
router.post("/signup", async (req, res) => {
  try {
    const { name, username, dateOfBirth, email, password, pic, status } =
      req.body;
    // let emailExists = await User.findOne({ email });
    // let usernameExists = await User.findOne({ username });
    // if (emailExists || usernameExists) {
    //   return res.json({ success: 0, message: "User Already Exists" });
    // }
    const salt = await bcrypt.genSalt(10);
    const encryptPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      username,
      dateOfBirth,
      email,
      password: encryptPassword,
      pic,
      status,
    });
    if (newUser) {
      return res.json({
        success: 1,
        message: "Account created Successfully",
        details: {
          id: newUser._id,
          name: newUser.name,
          pic: newUser.pic,
          email: newUser.email,
          status: newUser.status,
        },
      });
    }
    return res.status(401).send("Try Again");
  } catch (error) {
    console.log(error);
  }
});
//Login api to give access
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });
    if (userData) {
      const checkPassword = await bcrypt.compare(password, userData.password);
      if (checkPassword) {
        return res.json({
          details: {
            id: userData._id,
            name: userData.name,
            pic: userData.pic,
            email: userData.email,
            status: userData.status,
          },
        });
      } else {
        res.json({ message: "Incorrect Password", status: 0 });
      }
    } else {
      res.json({ message: "User not exists", status: 0 });
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
