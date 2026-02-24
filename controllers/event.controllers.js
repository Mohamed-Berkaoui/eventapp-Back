const { default: mongoose } = require("mongoose");
const eventModel = require("../models/event.model");
const ErrorRes = require("../views/error");
const FailRes = require("../views/fail");
const SuccessRes = require("../views/success");

async function getAllEvents(req, res) {
  try {
    const events = await eventModel.find();

    if (events.length == 0) {
      return res.json(new FailRes("no events found"));
    }

    res.json(new SuccessRes(events));
  } catch (error) {
    res.json(new ErrorRes(error.message));
  }
}

async function getEventById(req, res) {
  try {
    const eventId = req.params.id; //1222
    if (!mongoose.isValidObjectId(eventId)) {
      return res.json(new FailRes("wrong id"));
    }
    const event = await eventModel.findById(eventId);

    if (!event) {
      return res.json(new FailRes("event not found"));
    }
    res.json(new SuccessRes(event));
  } catch (error) {
    res.json(new ErrorRes(error.message));
  }
}

async function createEvent(req, res) {
  try {
    const { title, description, date, location, capacity, imageUrl } = req.body;
    //we must check the values first

    const newEvent = await eventModel.create({
      title,
      description,
      date,
      location,
      capacity,
      imageUrl,
      organizer: req.user, //token
    });
    res.json(new SuccessRes(newEvent));
  } catch (error) {
    res.json(new ErrorRes(error.message));
  }
}
module.exports = { getAllEvents, getEventById, createEvent };
