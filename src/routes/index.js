const express = require("express");
const AppError = require("../helpers/app-error");
const authRouter = require("./auth-route");
const userRouter = require("./user-route");

const router = express.Router();

router.use("/auth",authRouter)
router.use("/user",userRouter)

router.all("*", (req, res, next) => {
  next(new AppError(`Requested url is not found`, 404));
});

module.exports = router;
