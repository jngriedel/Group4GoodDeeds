//====External Modules====
var express = require('express');
const { db } = require('../config');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


//=====Internal Modules====
const { csrfProtection, asyncHandler } = require('./utils');
const db = require('../db/models');

//=====Initialize =======

var router = express.Router();


//========User Validators=========
const userValidators = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for First Name')
    .isLength({ max: 50 })
    .withMessage('First Name must not be more than 50 characters long'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Last Name')
    .isLength({ max: 50 })
    .withMessage('Last Name must not be more than 50 characters long'),
  check('emailAddress')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address')
    .isLength({ max: 255 })
    .withMessage('Email Address must not be more than 255 characters long')
    .isEmail()
    .withMessage('Email Address is not a valid email')
    .custom((value) => {
      return db.User.findOne({ where: { emailAddress: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Email Address is already in use by another account');
          }
        });
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
    .isLength({ max: 50 })
    .withMessage('Password must not be more than 50 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password')
    .isLength({ max: 50 })
    .withMessage('Confirm Password must not be more than 50 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password');
      }
      return true;
  })
];



//========Get Sign-Up Page=========
router.get('/sign-up', csrfProtection,(req, res) => {
  const user = db.User.build()
  res.send('user-sign-up',  {
    title: "Sign-Up",
    user,
    csrfToken: req.csrfToken()
  });
});


//==============Create New User===========
router.post('/sign-up', csrfProtection, userValidators, asyncHandler (async (req, res, next) => {
  const { emailAddress, firstName, lastName, password} = req.body;

  const user = await db.User.build({
    emailAddress, firstName, lastName
  })


  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;            /////because it's called password in our database. Double Check!
    await user.save();
    // loginUser(req, res, user);
    res.redirect('/');
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('user-sign-up', {
      title: 'Sign-Up',
      user,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));





//========Get Log-in Page==========
router.get('/log-in', function(req, res, next) {
  res.send('respond with a resource');
});


//==============Create New User===========
router.post('/log-in', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
