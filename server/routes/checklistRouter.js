const Router = require("express");
const router = new Router();
const checklistController = require("../controllers/checklistController");

router.get("/", checklistController.getChecklists);

module.exports = router;