const express = require("express");
const connectToDb = require("./config/connectToDb");
const { register, login } = require("./controllers/auth.controllers");
const {
  getMyProfile,
  updateMyProfile,
} = require("./controllers/user.controllers");
const jwt = require("jsonwebtoken");
const verifyUser = require("./middleware/verifyUser");
const server = express();

server.use(express.json());
/**
 * AUTH ROUTS
 */
server.post("/api/auth/register", register);
server.post("/api/auth/login", login);
/**
 * USER ROUTS
 */

server.get("/api/users/me", verifyUser, getMyProfile);
server.put("/api/users/me",verifyUser, updateMyProfile);

server.listen(3000, function () {
  connectToDb();
  console.log("our server running on port 3000");
});
