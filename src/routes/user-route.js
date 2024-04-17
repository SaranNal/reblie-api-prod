const express = require('express');
const { authenticateUser } = require("../jwtStrategy/jwtStrategy");
const { success } = require('../helpers/api-response');

const userRouter = new express.Router();
userRouter.use(authenticateUser);

userRouter.get('/user',(req,res) => {
    return res
    .status(200)
    .json(
      success(
        "Fetched Successfully",
        { data: req.user},
        res.statusCode
      )
    );
});

module.exports = userRouter;

