const router = require("express").Router();
const UserController = require("../controllers/UserController");
const { checkJwt, checkRole } = require("../middlewares");

// Get all user
router.get("/", UserController.listAll);
// router.get("/", [checkJwt, checkRole(["ADMIN"])], UserController.listAll);

// Get one user
router.get(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  UserController.getOneById
);

// Create a new user
router.post("/", [checkJwt, checkRole(["ADMIN"])], UserController.newUser);

// Edit one user
router.patch(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  UserController.editUser
);

// Delete User
router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  UserController.deleteUser
);

module.exports = router;
