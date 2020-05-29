const mongoose = require("mongoose");

module.exports = (url) => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((e) => {
      console.error("Connection error", e.message);
    });

  const db = mongoose.connection;

  return db;
};
