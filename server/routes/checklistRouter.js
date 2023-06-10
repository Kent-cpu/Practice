const Router = require("express");
const router = new Router();
const checklistController = require("../controllers/checklistContoller");

router.get("/", checklistController.getChecklists);

module.exports = router;