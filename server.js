const express = require("express");
const connectToDb = require("./config/connectToDb");
const { register, login } = require("./controllers/auth.controllers");
const {
  getMyProfile,
  updateMyProfile,
} = require("./controllers/user.controllers");
const verifyUser = require("./middleware/verifyUser");
const {
  getAllEvents,
  getEventById,
  createEvent,
} = require("./controllers/event.controllers");
const checkOrganizer = require("./middleware/checkOrganizer");
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
server.put("/api/users/me", verifyUser, updateMyProfile);

/**
 * EVENT ROUTES
 */

server.get("/api/events", verifyUser, getAllEvents);
server.post("/api/events", verifyUser,checkOrganizer, createEvent);

server.get("/api/events/:id", verifyUser,  getEventById);

server.listen(3000, function () {
  connectToDb();
  console.log("our server running on port 3000");
});
