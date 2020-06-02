const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { bcryptSalt } = require("../config/config");

const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: {
      type: String,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    },
    password: { type: String, required: true },
    role: { type: String, required: true },
    // email: {
    //   type: String,
    //   required: [true, "can't be blank"],
    //   match: [/\S+@\S+\.\S+/, "is invalid"],
    // },
  },
  { timestamps: true }
);

User.methods.hashPassword = function () {
  const salt = bcrypt.genSaltSync(bcryptSalt);
  this.password = bcrypt.hashSync(this.password, salt);
};

User.methods.checkIfUnencryptedPasswordIsValid = function (
  unencryptedPassword
) {
  console.log("CHECK");
  return bcrypt.compareSync(unencryptedPassword, this.password);
};

module.exports = mongoose.model("user", User);
