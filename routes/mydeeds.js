const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');
const db  = require('../db/models');

router.get('/', async(req, res) => {

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

    res.render('mydeeds', { karmas, reviews });
} )


module.exports = router;
