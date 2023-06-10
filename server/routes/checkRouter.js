const Router = require('express');
const router = new Router();
const checkController = require("../controllers/checkController");

router.post("/", checkController.saveCheck);

module.exports = router;

