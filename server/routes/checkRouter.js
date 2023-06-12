const Router = require('express');
const router = new Router();
const checkController = require("../controllers/checkController");


router.get("/", checkController.getChecks);
router.get("/:id", checkController.getCheck);
router.post("/", checkController.saveCheck);


module.exports = router;

