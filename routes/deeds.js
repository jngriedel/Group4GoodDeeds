//====External Modules====
var express = require('express');
const { check, validationResult } = require('express-validator');


//=====Internal Modules====
const { csrfProtection, asyncHandler } = require('./utils');
const db = require('../db/models');
const { requireAuth } = require('../auth');

//=====Initialize =======

var router = express.Router();



//========Get Deed Page=========
router.get('/:id(\\d+)', csrfProtection, asyncHandler(async(req, res) => {
    const deedId = req.params.id

    const deed = await db.Deed.findByPk(deedId, {
        include: [db.Review, db.Status]
    })
    const reviews = await db.Review.findAll({where: {
      deedId
    }, include: db.User,
    order: [
      ['id', 'DESC'],
  ]})


    if (!deed) {
      res.status(404)
      return  res.send("Error 404 Deed not Found!")
    }
    res.render('deed',  {
      title: `Deed #${deedId}`,
      deed,
      reviews,
      csrfToken: req.csrfToken()
    })
}));

const reviewValidators = [
  check('title')
    .exists({checkFalsy: true})
    .withMessage('Review must have a Title')
    .isLength({max: 50})
    .withMessage("Title must be 50 characters or fewer"),
  check('rating')
    .exists({checkFalsy: true})
    .withMessage('Review must have a Rating')
]

//==========Post Review on Deed Page============
//took out csurf for now
router.post('/:id(\\d+)', reviewValidators, asyncHandler(async(req, res) => {
    const deedId = req.params.id
    console.log('you made it')

    const {title, body, rating} = req.body
    const validatorErrors = validationResult(req);
    console.log("this works")
    if (validatorErrors.isEmpty()) {
    const newReview = await db.Review.create({
      title,
      body,
      rating,
      deedId,
      userId: 1
    })
    const newId = newReview.id
    const review = await db.Review.findByPk(newId, {
      include: db.User
    })

    res.json({message: "Success!", review})
  }


  else {
    const errors = validatorErrors.array().map(error => error.msg);
    // console.log(errors);
    res.json({errors})
};

}));











module.exports = router;
