//=====External Imports=====//
const express = require('express');
const { check, validationResult } = require('express-validator');

//=====Internal Imports=====//
const { csrfProtection, asyncHandler } = require('./utils');
const db  = require('../db/models');
const { requireAuth } = require('../auth');

//======Initialize===//
const router = express.Router();


//=======Read a Karma=====//
router.get('/karmas', csrfProtection, requireAuth, async(req, res) => {
    const karmas = await db.Karma.findAll();
    let loggedInUser;
    if (req.session.auth) {
        loggedInUser = req.session.auth.userId;
    };

    res.render('karmas', { karmas, loggedInUser });
});

const karmaValidators = [
    check('title')
      .exists({checkFalsy: true})
      .withMessage('Please provide a value for the title')
      .isLength({max: 20})
      .withMessage('Title must not be more than 20 characters long')
];

//=====Create a Karma====//
router.post('/karmas', csrfProtection, requireAuth, karmaValidators, asyncHandler(async(req, res, next) => {
    const { title } = req.body;

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        const karma = await db.Karma.create({
            title,
        });
        res.status(201).json({ karma });
    } else {
        const errors = validatorErrors.array().map(error => error.msg);
        res.render('karma-add', {
            csrfToken: req.csrfToken(),
            errors,
            data: req.body});
    };
}))


//====Update a Karma Name====//
router.put('/karmas/:karmaId(\\d+)', csrfProtection, requireAuth, async(req, res) => {
    const karma = await db.Karma.findByPk(req.params.id);
    karma.title = req.body.title;
    await karma.save();
    res.json({message: "Success!"}, karma);
});

//====Delete a Karma=====//
router.delete('/karmas/:karmaId(\\d+)', csrfProtection, requireAuth, asyncHandler(async(req, res, next) => {
    const karma = await db.Karma.findByPk(req.params.id);
    await karma.destroy();
    res.json({message: 'Success!'});
}));
