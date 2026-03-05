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
  getMyEvents,
} = require("./controllers/event.controllers");
const checkOrganizer = require("./middleware/checkOrganizer");
const {
  createRegistration,
  cancelRegistration,
  listAttendees,
  getMyRegistrations,
} = require("./controllers/registration.controllers");
const server = express();

var cors = require('cors')

server.use(cors({
  origin:["http://localhost:5173"],
  methods:['GET',"POST","DELETE","PUT"]
}))
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
server.get("/api/events/myevents", checkOrganizer, getMyEvents);
server.get("/api/events/:id", getEventById);
server.post("/api/events", checkOrganizer, createEvent);
server.put("/api/events/:id", checkOrganizer, updateMyEvent);
server.delete("/api/events/:id", checkOrganizer, deleteMyEvent);

/**
 * REGISTRATION ROUTES
 */
server.post("/api/regsitrations/:eventid", createRegistration);
server.delete("/api/regsitrations/:eventid", cancelRegistration);
server.get(
  "/api/regsitrations/:eventid/attendees",
  checkOrganizer,
  listAttendees,
);
server.get("/api/regsitrations", getMyRegistrations);

server.listen(3000, function () {
  connectToDb();
  console.log("our server running on port 3000");
});
