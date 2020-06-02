const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../entity/user");

module.exports = {
  login: async (req, res) => {
    // Check if username and password are set
    let { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send();
    }

    // Get user from database
    let user = null;
    try {
      user = await User.findOne({ username });
      console.log("user: ", user);
    } catch (error) {
      res.status(401).send();
    }

    // Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      config.jwtSecret,
      { expiresIn: "1h" }
    );
    console.log("token: ", token);
    // Send the jwt in the responce
    res.send(token);
  },
  changePassword: async (req, res) => {
    // Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    // Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    // Get user from the database
    let user = null;
    try {
      user = User.findOne({ _id: id });
    } catch (id) {
      res.status(401).send();
    }

    // Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }

    user.password = newPassword;

    user.hashPassword();
    User.insertOne(user);

    res.status(204).send();
  },
};
