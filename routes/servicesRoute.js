const express = require("express");
const router = express.Router();
const Service = require("../models/servicesModel");

router.get("/getallservices", async (req, res) => {
  try {
    const services = await Service.find();
    res.send(services);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/addservice", async (req, res) => {
  try {
    const newservice = new Service(req.body);
    await newservice.save();
    res.send("Service added successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/editservice", async (req, res) => {
  try {
    const service = await Service.findOne({ _id: req.body._id });
    service.name = req.body.name;
    service.image = req.body.image;
    service.serviceType = req.body.serviceType;
    service.rate = req.body.rate;
    service.servicetime = req.body.servicetime;
    await service.save();
    res.send("Service details updated successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/deleteservice", async (req, res) => {
  try {
    await Service.findOneAndDelete({ _id: req.body.serviceid });

    res.send("Service deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
