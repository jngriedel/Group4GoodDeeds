//====External Modules====
var express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


//=====Internal Modules====
const { csrfProtection, asyncHandler } = require('./utils');
const db = require('../db/models');
const { loginUser, logoutUser } = require('../auth');

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
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address')
    .isLength({ max: 255 })
    .withMessage('Email Address must not be more than 255 characters long')
    .isEmail()
    .withMessage('Email Address is not a valid email')
    .custom((value) => {
      return db.User.findOne({ where: { email: value } })
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
router.get('/sign-up', csrfProtection, asyncHandler( async(req, res) => {
  const user = await db.User.build()

  res.render('user-sign-up',  {
    title: "Sign-Up",
    user,
    csrfToken: req.csrfToken(),
  });
}));


//==============Create New User===========
router.post('/sign-up', csrfProtection, userValidators, asyncHandler (async (req, res, next) => {
  const { email, firstName, lastName, password} = req.body;

  const user = await db.User.build({
    email, firstName, lastName
  })


  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    loginUser(req, res, user);
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
router.get('/log-in', csrfProtection, (req, res) =>  {

  res.render('user-log-in', {
    title: 'Log In',
    csrfToken: req.csrfToken()
  });
});


//==============Create New User===========


const loginValidators = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password'),
];




router.post('/log-in', csrfProtection, loginValidators, asyncHandler(async(req, res, next) => {

    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email } });

    let errors = [];

    const validatorErrors = validationResult(req);




      if (user) {
        if (await bcrypt.compare(password, user.password.toString())) {
          loginUser(req, res, user);
          res.redirect("/");
        } else {
          if (email || password) {
            errors.push('Log-in failed with the provided email or password.');
            }
            validatorErrors.array().map((error) => errors.push(error.msg));
            res.render('user-log-in', {
                    title: 'Log In',
                    email,
                    errors,
                    csrfToken: req.csrfToken(),
                  });
          }
    } else {
      if (email || password) {
      errors.push('Log-in failed with the provided email or password.');
      }
      validatorErrors.array().map((error) => errors.push(error.msg));
      res.render('user-log-in', {
              title: 'Log In',
              email,
              errors,
              csrfToken: req.csrfToken(),
            });
    }
}));













//======Demo User=====
router.post('/demo-user', csrfProtection,  asyncHandler(async(req, res, next) => {
  const { email_demo, password_demo } = req.body;




    const user = await db.User.findOne({
      where: {
        email: email_demo
      },
    });


      const passwordMatch = await bcrypt.compare(password_demo, user.password.toString());

      if (passwordMatch) {
        loginUser(req, res, user);
        req.session.save(( ) => res.redirect('/'))
      }





}));

//======Log-out=========

router.post('/log-out', (req, res) => {
  logoutUser(req, res);
  req.session.save(( ) => res.redirect('/'))
});

module.exports = router;
