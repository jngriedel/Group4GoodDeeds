const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');
const db  = require('../db/models');
const { check, validationResult } = require('express-validator');

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

router.post('/:id(\\d+)/edit', reviewValidators, asyncHandler( async(req, res) => {
    const reviewId = req.params.id


    const {title, body, rating} = req.body
    const review = await db.Review.findByPk(reviewId)

    const validatorErrors = validationResult(req);


    if (validatorErrors.isEmpty()) {
    await review.update({
      title,
      body,
      rating,
    })
    res.json({message: "Success!", review})
  }


  else {
    const errors = validatorErrors.array().map(error => error.msg);
    res.json({errors})
};

}));

router.post('/:id(\\d+)', asyncHandler( async(req, res) => {
    const reviewId = req.params.id;
    const review = await db.Review.findByPk(reviewId)
    await review.destroy();
    res.redirect('/mydeeds');
}));

module.exports = router;
