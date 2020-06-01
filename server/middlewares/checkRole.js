const User = require("../entity/user");

module.exports = checkRole = (roles) => {
  return async (req, res, next) => {
    // Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;

    // Get user role from database
    let user = null;
    try {
      user = await User.findOne({ _id: id });
    } catch (id) {
      res.status(401).send();
    }

    //Check if array of authorized roles includes the user's role
    if (roles.indexOf(user.role) > -1) next();
    else res.status(401).send();
  };
};
