const userModel = require("../models/user.model");
const FailRes = require("../views/fail");

  async function checkOrganizer(req, res, next) {
    const user = await userModel.findById(req.user);
    if (user.role != "organizer") {
      return res.json(new FailRes("not authorized", 403));
    }
    next()
  }

  module.exports=checkOrganizer