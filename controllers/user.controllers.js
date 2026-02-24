const userModel = require("../models/user.model");
const ErrorRes = require("../views/error");
const FailRes = require("../views/fail");
const SuccessRes = require("../views/success");

async function getMyProfile(req, res) {
  try {
    const idUser = req.user;
    const profile = await userModel.findById(idUser, { passwordHash: 0 });
    if (!profile) {
      return res
        .status(400)
        .json(new FailRes( "profile not found" ));
    }
    res.json(new SuccessRes(profile));
  } catch (error) {
    res.json(new ErrorRes(error.message));
  }
}

async function updateMyProfile(req, res) {
  try {
    const { name } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user,
      { name: name },
      { returnDocument: "after" },
    );
    if (!updatedUser) {
      return res.json(FailRes("user not found"));
    }
    res.json(new SuccessRes(updatedUser,201));
  } catch (error) {
    res.json(new ErrorRes(error.message));
  }
}

module.exports = { getMyProfile, updateMyProfile };
