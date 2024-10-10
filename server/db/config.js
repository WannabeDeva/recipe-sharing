const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://ironydeva:deva123@deva.ptcba.mongodb.net/?retryWrites=true&w=majority&appName=Deva")
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
