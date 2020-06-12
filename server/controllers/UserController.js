const User = require("../entity/user");

module.exports = {
  listAll: async (req, res) => {
    // Get users from database
    let users = await User.find({}, { id: 1, username: 1, role: 1 });

    // Send the users object
    res.send(users);
  },
  getOneById: async (req, res) => {
    // Get the ID from the url
    const id = req.params.id;

    try {
      const user = await User.find(
        { _id: id },
        { _id: 1, username: 1, role: 1 }
      );
    } catch (error) {
      res.status(404).send("User not found");
    }
  },
  newUser: async (req, res) => {
    // Get parameters from the body
    let { username, password, role } = req.body;
    let user = new User({ username, password, role });

    // Hash the password to securely store on DB
    user.hashPassword();

    // Try to save. If fails, the username is already in use
    try {
      console.log("USER: ", user);
      // validate
      if (await User.findOne({ username: user.username })) {
        throw 'Username "' + user.username + '" is already taken';
      }

      // save user
      await user.save();
    } catch (e) {
      res.status(409).send(e);
      return;
    }

    // // If all ok, send 201 response
    res.status(201).send("User created");
  },
  editUser: async (req, res) => {
    // Get the ID from the url
    const id = req.params.id;

    // Get values from the body
    const { username, role } = req.body;

    // Try to find user on database
    let user = null;
    try {
      user = await User.findOne({ _id: id });
    } catch (error) {
      // If not found, send a 404 response
      res.status(404).send("User not found");
      return;
    }

    // Validate the new values on model
    user.username = username;
    user.role = role;

    // Try to safe, if fails, that means username alreafy in use
    try {
      await User.insertOne(user);
    } catch (e) {
      res.status(409).send("username already in use");
    }

    res.status(204).send();
  },
  deleteUser: async (req, res) => {
    // Get the ID from the url
    const id = req.params.id;

    let user = null;
    try {
      user = await User.findOne({ _id: id });
    } catch (error) {
      res.status(404).send("User not found");
      return;
    }
    User.remove({ _id: id });

    res.status(204).send();
  },
};
