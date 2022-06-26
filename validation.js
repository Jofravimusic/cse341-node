const { check, validationResult } = require('express-validator');

exports.inputValidation = [
  check('firstName', 'First Name is required').not().isEmpty(),
  check('lastName', 'Last Name is required').not().isEmpty(),
  check('email', 'Please include a valid email')
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  check('favoriteColor', 'Favorite Color is required').not().isEmpty(),
  check('birthday', 'Birthday is required').not().isEmpty(),
];

exports.results = validationResult;
