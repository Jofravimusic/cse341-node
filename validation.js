const { check, validationResult } = require('express-validator');

exports.inputValidation = [
  check('firstName', 'First Name is requied').not().isEmpty(),
  check('lastName', 'Last Name is requied').not().isEmpty(),
  check('email', 'Please include a valid email')
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  check('favoriteColor', 'Favorite Color is requied').not().isEmpty(),
  check('birthday', 'Birthday is requied').not().isEmpty(),
];

exports.results = validationResult;
