const Router = require('express');
const router = new Router();
const userController = require("../controllers/userController");
const {registrationValidationRules, registrationHandler} = require("../validation/registration");
const {loginValidationRules, loginHandler} = require("../validation/login");

router.post("/registration", registrationValidationRules, registrationHandler, userController.registration);
router.post("/login", loginValidationRules, loginHandler, userController.login);
router.get("/auth", userController.check);

module.exports = router;