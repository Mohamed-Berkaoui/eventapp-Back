const eventModel = require("../models/event.model");
const registrationModel = require("../models/registration.model");
const ErrorRes = require("../views/error");
const FailRes = require("../views/fail");
const SuccessRes = require("../views/success");

async function createRegistration(req, res) {
  try {
    const eventId = req.params.id;
    const event = await eventModel.findOne({ _id: eventId, status: "active" });

    if (!event) {
      return res.json(new FailRes("event Not Found"));
    } 

    /**
     * @todo add date check 
     */


    const eventRegistrations = await registrationModel.find({ event: eventId });

    if (event.capacity <= eventRegistrations.length) {
      return res.json(new FailRes("capacity full"));
    }

    const newRegistration = await registrationModel.create({
      user: req.user,
      event: eventId,
    });

    res.json(new SuccessRes(newRegistration));
  } catch (error) {
    res.json(new ErrorRes(error.message))
  }
}

module.exports = { createRegistration };
