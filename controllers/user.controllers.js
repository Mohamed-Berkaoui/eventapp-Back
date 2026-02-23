const userModel = require("../models/user.model");

async function getMyProfile(req, res) {
  try {
    const idUser = req.user;
    const profile = await userModel.findById(idUser, { passwordHash: 0 });
    if (!profile) {
      return res
        .status(400)
        .json({ status: "FAIL", data: "profile not found" });
    }
    res.status(200).json({ status: "SUCCESS", data: profile });
  } catch (error) {
    res.status(500).json({ status: "ERROR", message: error.message });
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
      return res.status(400).json({ status: "FAIL", data: "user not found" });
    }
    res.status(201).json({ status: "SUCCESS", data: updatedUser });
  } catch (error) {
    res.status(500).json({ status: "ERROR", message: error.message });
  }
}

module.exports = { getMyProfile, updateMyProfile };
