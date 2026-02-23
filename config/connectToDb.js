const mongoose = require("mongoose");

function connectToDb() {
  const MONGOURI = "mongodb://localhost:27017/";
  mongoose
    .connect(MONGOURI, { dbName: "eventApp" })
    .then(() => console.log("db running"))
    .catch((e) => console.log(e.message));
}

module.exports=connectToDb