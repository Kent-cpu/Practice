const Router = require('express');
const router = new Router();
const reportController = require("../controllers/reportController");


router.post("/", reportController.saveReport);
router.get("/stats", reportController.findWorstChecklists);

module.exports = router;