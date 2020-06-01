const router = require("express").Router();
const AuthController = require("../controllers/AuthController");
const { checkJwt } = require("../middlewares");

// Login route
router.post("/login", AuthController.login);

// Change User password
router.post("/chage-password", [checkJwt], AuthController.changePassword);

module.exports = router;
