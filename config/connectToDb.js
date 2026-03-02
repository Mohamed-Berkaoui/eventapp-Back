const mongoose = require("mongoose");

function connectToDb() {
  const MONGOURI = "mongodb+srv://mohamed:IKh9AxK2qIIwWI5s@cluster0.ghbjfij.mongodb.net/";
  mongoose
    .connect(MONGOURI, { dbName: "eventApp" })
    .then(() => console.log("db running"))
    .catch((e) => console.log(e.message));
}

module.exports=connectToDb