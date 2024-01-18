const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Reg = require("../models/registerModel");

router.get("/getalluser", async (req, res) => {
  try {
    const users = await Reg.find();
    res.send(users);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // If the User is found on Database then logged in
    // else error message will be shown which is declared on userAction
    const user = await Reg.findOne({ email, password });
    if (user) {
      res.status(200).send(user);
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    // If already a user then erro will be shown
    const user = await Reg.findOne({ email });
    if (user) {
      return res.status(400).json(error);
    } else {
      const newuser = new User(req.body);
      // If a new User registered , then that will be saved on databse
      await newuser.save();
      const newReg = new Reg(req.body);
      await newReg.save();
      res.send("User registered successfully");
    }
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/edituser", async (req, res) => {
  try {
    // If already a user then erro will be shown
    const user = await Reg.findOne({ _id: req.body._id });
    user.email = req.body.email;
    user.username = req.body.username;
    user.password = req.body.password;
    await user.save();

    res.send(user);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/deleteuser", async (req, res) => {
  try {
    await Reg.findOneAndDelete({ _id: req.body.userid });

    res.send("User deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
