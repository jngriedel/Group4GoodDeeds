const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');
const db  = require('../db/models');
const { requireAuth } = require('../auth');

router.get('/', requireAuth, asyncHandler( async(req, res) => {

    const karmas = await db.Karma.findAll({
        where: {
            userId: res.locals.user.id

        }
    })

    const reviews = await db.Review.findAll({
        include: [db.Deed, db.User],
        where: {
            userId: res.locals.user.id

        }
    })
    const dates = []
    for (let i = 0; i < reviews.length; i++) {
        const element = reviews[i];
        const oldDate = element.createdAt
        var date = new Date(oldDate),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      dates.push( [mnth, day, date.getFullYear()].join("-"))

    }
    res.render('mydeeds', { karmas, reviews, dates });
} ))


module.exports = router;
