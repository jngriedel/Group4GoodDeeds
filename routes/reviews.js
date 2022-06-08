const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');
const db  = require('../db/models');

router.post('/:id(\\d+)', async(req, res) => {
    const reviewId = req.params.id;
    const review = await db.Review.findByPk(reviewId)
    review.title = req.body.title;
    review.body = req.body.body;
    await review.save();
    res.redirect('/mydeeds');
})

router.post('/:id(\\d+)', async(req, res) => {
    const reviewId = req.params.id;
    const review = await db.Review.findByPk(reviewId)
    await review.destroy();
    res.redirect('/mydeeds');
})

module.exports = router;
