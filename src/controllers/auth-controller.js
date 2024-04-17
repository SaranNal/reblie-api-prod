// const User = require("../models/user-model");
const { Sequelize } = require('sequelize');
const db = require("../../models");
const catchAsync = require("../helpers/catch-async");
const { error, success } = require("../helpers/api-response");
const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");
const Role = db.roles;
const User = db.users;

exports.getLoginRequest = catchAsync(async (req, res) => {
  const { email, password, persistentLogin } = req.body;

  const user = await User.findOne({
    where: { email: email, status: true },
    attributes: ["id", "firstName", "lastName", "password", "email"],
  });
  if (!user) {
    return res
      .status(404)
      .json(
        error(
          "There is no user found with this email and password",
          res.statusCode
        )
      );
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return res
      .status(400)
      .json(
        error(
          "There is no user found with this email and password",
          res.statusCode
        )
      );
  }
  const tokenExpiredDays =
    persistentLogin === "true" ? process.env.JWT_EXPIRES : "1m";
  const refreshTokenExpiredDays =
    persistentLogin === "true" ? process.env.JWT_REFRESH_TOKEN_EXPIRES : "1d";
  const accessToken = jsonWebToken.sign(
    {
      id: user.id,
      email: user.email,
      name: user.firstName,
      expiredDays: tokenExpiredDays,
    },
    process.env.JWT_SECRET,
    { expiresIn: tokenExpiredDays }
  );
  const refreshToken = jsonWebToken.sign(
    {
      id: user.id,
      email: user.email,
      name: user.firstName,
      expiredDays: refreshTokenExpiredDays,
    },
    process.env.JWT_SECRET,
    { expiresIn: refreshTokenExpiredDays }
  );
  user.lastLoginAt = new Date();
  user.sessionToken = refreshToken;
  await user.save();
  return res.status(200).json(
    success(
      "Login Success!",
      {
        data: {
          accessToken: accessToken,
          refreshToken: refreshToken,
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            id: user.id,
            email: user.email,
          },
        },
      },
      res.statusCode
    )
  );
});

