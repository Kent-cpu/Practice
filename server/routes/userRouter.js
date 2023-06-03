const Router = require('express');
const router = new Router();
const userController = require("../controllers/userController");
const {registrationValidationRules, registrationHandler} = require("../validation/registration");

router.post("/registration", registrationValidationRules, registrationHandler);
router.post("/login", userController.login);
router.get("/auth", userController.check);

module.exports = router;