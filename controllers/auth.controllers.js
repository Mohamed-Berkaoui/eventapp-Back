const userModel = require("../models/user.model");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const FailRes = require("../views/fail");
const SuccessRes = require("../views/success");
const ErrorRes = require("../views/error");

async function register(req, res) {
  try {
    const { email, name, password, role } = req.body;
    //check for the email with regex and the password ids it storng
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res
        .json(new FailRes("user Already exist"));
    }
    const paswordHash = bcrypt.hashSync(password, 10);
    const newUser = await userModel.create({
      name: name,
      email: email,
      passwordHash: paswordHash,
      role: role ? role : "user",
    });
    res.json(new SuccessRes(newUser,201));
  } catch (error) {
    res.status(500).json(new ErrorRes(error.message));
  }
}

 async function login (req, res) {
  try {
    const { email, password } = req.body;
    //check for the email with regex and the password ids it storng
    const existUser = await userModel.findOne({ email }); //{email;passordhash,role}
    if (!existUser) {
      return res.json(new FailRes("user not exist"));
    }
    const isValidPassword = bcrypt.compareSync(
      password,
      existUser.passwordHash,
    );
    if (!isValidPassword) {
      return res.json(new FailRes("wrong password"));
    }

    const token = jwt.sign({ user: existUser._id }, "hello world", {
      expiresIn: "1d",
    });

    res.json(new SuccessRes(token));
  } catch (error) {
    res.json(new ErrorRes(error.message));
  }
}

module.exports={register,login}