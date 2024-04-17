const { body } = require("express-validator");
const validate = require("./validate");
const { emailValidation } = require("../helpers/global-validation");


// Validation for login request
module.exports.validateLoginRequest = validate([
    body("email")
      .isString()
      .not()
      .isEmpty()
      .trim()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Enter the valid email address")
      .normalizeEmail({
        gmail_remove_subaddress: false,
        gmail_remove_dots: false,
      })
      .custom(emailValidation)
      .withMessage("Enter the valid email address"),
    body("password")
      .isString()
      .not()
      .isEmpty()
      .trim()
      .withMessage("Password is required"),
  ]);