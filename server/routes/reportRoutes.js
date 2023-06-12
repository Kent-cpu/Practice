const Router = require('express');
const router = new Router();
const reportController = require("../controllers/reportController");


router.post("/", reportController.saveReport);

module.exports = router;