const eventModel = require("../models/event.model");
const registrationModel = require("../models/registration.model");
const ErrorRes = require("../views/error");
const FailRes = require("../views/fail");
const SuccessRes = require("../views/success");

async function createRegistration(req, res) {
  try {
    const eventId = req.params.eventid;
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
    const existRegsitration = await registrationModel.findOne({
      user: req.user,
      event: eventId,
    });

    if (existRegsitration && existRegsitration.status == "active") {
      return res.json(new FailRes("already registred"));
    }
    if (existRegsitration && existRegsitration.status != "active") {
      await registrationModel.updateOne(
        {
          user: req.user,
          event: eventId,
        },
        { status: "active" },
      );
      return res.json(
        new SuccessRes({ ...existRegsitration._doc, status: "active" }),
      );
    }

    const newRegistration = await registrationModel.create({
      user: req.user,
      event: eventId,
    });
    res.json(new SuccessRes(newRegistration));
  } catch (error) {
    res.json(new ErrorRes(error.message));
  }
}

async function cancelRegistration(req, res) {
  try {
    const userId = req.user;
    const eventId = req.params.eventid;

    const cancelledReg = await registrationModel.updateOne(
      { user: userId, event: eventId },
      { status: "cancelled" },
    );

    if (cancelledReg.modifiedCount == 0) {
      return res.json(new FailRes("registration not found"));
    }

    res.json(new SuccessRes("registration cancelled successfuly"));
  } catch (error) {
    res.json(new ErrorRes(error.message));
  }
}

async function listAttendees(req, res) {
  try {
    const eventId = req.params.eventid;
    const userId = req.user;
    const event = await eventModel.findOne({ _id: eventId, organizer: userId });
    if (!event) {
      return res.json(new FailRes("somthing went wrong"));
    }
    const eventRegistrations = await registrationModel
      .find({ event: eventId })
      .populate({ path: "user", select: "-passwordHash" });
    if (eventRegistrations.length == 0) {
      return res.json(new FailRes("no registrations"));
    }
    res.json(new SuccessRes(eventRegistrations));
  } catch (error) {
    res.json(new ErrorRes(error.message));
  }
}

async function getMyRegistrations(req, res) {
  try {
    const userId = req.user;
    const registrations = await registrationModel.find({ user: userId ,status:"active"}).populate('event');
    if (!registrations.length) {
      return res.json(new FailRes("no registration found"));
    }
    res.json(new SuccessRes(registrations));
  } catch (error) {
    res.json(new ErrorRes(error.message));
  }
}

module.exports = {
  createRegistration,
  getMyRegistrations,
  cancelRegistration,
  listAttendees,
};
