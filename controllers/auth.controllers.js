const userModel = require("../models/user.model");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')

async function register(req, res) {
  try {
    const { email, name, password, role } = req.body;
    //check for the email with regex and the password ids it storng
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res
        .status(400)
        .json({ status: "FAIL", data: "user allready exist" });
    }
    const paswordHash = bcrypt.hashSync(password, 10);
    const newUser = await userModel.create({
      name: name,
      email: email,
      passwordHash: paswordHash,
      role: role ? role : "user",
    });
    res.status(201).json({ status: "SUCCESS", data: newUser });
  } catch (error) {
    res.status(500).json({ status: "ERROR", message: error.message });
  }
}

 async function login (req, res) {
  try {
    const { email, password } = req.body;
    //check for the email with regex and the password ids it storng
    const existUser = await userModel.findOne({ email }); //{email;passordhash,role}
    if (!existUser) {
      return res.status(400).json({ status: "FAIL", data: "user not exist" });
    }
    const isValidPassword = bcrypt.compareSync(
      password,
      existUser.passwordHash,
    );
    if (!isValidPassword) {
      return res.status(400).json({ status: "FAIL", data: "wrong password" });
    }

    const token = jwt.sign({ user: existUser._id }, "hello world", {
      expiresIn: "1d",
    });

    res.status(200).json({ status: "SUCCESS", data: token });
  } catch (error) {
    res.status(500).json({ status: "ERROR", message: error.message });
  }
}

module.exports={register,login}