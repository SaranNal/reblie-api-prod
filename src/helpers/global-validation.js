
exports.emailValidation = (value) => {
    const checkSpecialValue = /[ `!#$%^&*()_\=\[\]{};':"\\|,<>\/?~]/;
    const firstAndLastPosition = /[ `+.-]/;
    const position = value.indexOf("@");
    if (
      checkSpecialValue.test(value.substring(0, position)) ||
      firstAndLastPosition.test(value.substring(position, position - 1)) ||
      firstAndLastPosition.test(value.substring(0, 1))
    )
      return Promise.reject("Enter the valid email address");
    return true;
  };
  