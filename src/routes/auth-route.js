const express = require('express');
const { validateLoginRequest } = require('../validators/auth-validators');
const { getLoginRequest } = require('../controllers/auth-controller');


const authRouter = new express.Router();

authRouter.post('/login', validateLoginRequest, getLoginRequest);


module.exports = authRouter;