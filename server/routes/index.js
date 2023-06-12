const Router = require('express');
const router = new Router();
const userRouter = require("./userRouter");
const checklistRouter = require('./checklistRouter');
const checkRouter = require("./checkRouter");
const reportRoutes = require("./reportRoutes");

router.use("/user", userRouter);
router.use("/checklist", checklistRouter);
router.use("/check", checkRouter);
router.use("/report", reportRoutes);


module.exports = router;