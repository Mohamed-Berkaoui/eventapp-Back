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
  updateMyEvent,
  deleteMyEvent,
} = require("./controllers/event.controllers");
const checkOrganizer = require("./middleware/checkOrganizer");
const { createRegistration } = require("./controllers/registration.controllers");
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
server.use(verifyUser);
server.get("/api/users/me", getMyProfile);
server.put("/api/users/me", updateMyProfile);
/**
 * EVENT ROUTES
 */
server.get("/api/events", getAllEvents);
server.get("/api/events/:id", getEventById);

server.post("/api/events", checkOrganizer,createEvent);
server.put("/api/events/:id",checkOrganizer ,updateMyEvent);
server.delete("/api/events/:id", checkOrganizer,deleteMyEvent);
/**
 * REGISTRATION ROUTES
 */
server.post('/api/events/:id/register',createRegistration)

server.listen(3000, function () {
  connectToDb();
  console.log("our server running on port 3000");
});
