const express = require("express");
const router = express.Router();
const BookingService = require("../models/bookingsServicesModel");
const Service = require("../models/servicesModel");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51LIzXBJwQzOW9VgLQL7Goet4qhdD58I6qU55ik6k4EkBrJVhao6iQaLXLOAsY93ccCnrOyp5yXhHYWFGjmtgy7B200DlPs8EvH"
);
router.post("/bookservice", async (req, res) => {
  const { token } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: req.body.totalAmount * 100,
        currency: "BDT",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      req.body.transactionId = payment.source.id;
      const newbooking = new BookingService(req.body);
      await newbooking.save();
      const service = await Service.findOne({ _id: req.body.service });
      console.log(req.body.service);
      service.bookedTimeSlots.push(req.body.bookedTimeSlots);

      await service.save();
      res.send("Your booking is successfull");
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.get("/getallbookingsservice", async (req, res) => {
  try {
    const bookingsService = await BookingService.find().populate("service");
    res.send(bookingsService);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
