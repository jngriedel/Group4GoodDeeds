//=====External Imports=====//
const express = require('express');
const { check, validationResult } = require('express-validator');

//=====Internal Imports=====//
const { csrfProtection, asyncHandler } = require('./utils');
const db  = require('../db/models');
const { requireAuth } = require('../auth');

//======Initialize===//
const router = express.Router();


//=======Read Users Karmas=====//
router.get('/', csrfProtection, requireAuth, asyncHandler( async(req, res) => {
    const karmas = await db.Karma.findAll({
        where:{
            userId: res.locals.user.id
        },
        order: [[
            "id", "DESC"
        ]]
    });
    // let loggedInUser;
    // if (req.session.auth) {
    //     loggedInUser = req.session.auth.userId;
    // };
    res.render('karmas', {
        karmas,
        csrfToken: req.csrfToken(),
     });
}));

const karmaValidators = [
    check('title')
      .exists({checkFalsy: true})
      .withMessage('Please provide a value for the title')
      .isLength({max: 20})
      .withMessage('Title must not be more than 20 characters long')
];

//=====Create a Karma====//
router.post('/', karmaValidators, asyncHandler(async(req, res, next) => {
    const { title } = req.body;

    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
        const karma = await db.Karma.create({
            title,
            userId: res.locals.user.id,
        });
        await karma.save();
        console.log(karma)
        res.json({message: 'Success!', karma});
    } else {
        const errors = validatorErrors.array().map(error => error.msg);
        res.render('karmas', {
            errors,
            data: req.body});
    };
}));


//====Update a Karma Name====//
router.put('/:id(\\d+)', async(req, res) => {
    const karmaId = req.params.id;
    const karma = await db.Karma.findByPk(karmaId);
    console.log(karma)
    karma.title = req.body.title;
    await karma.save();
    console.log(karma.title)
    res.json({karma});
});

//====Delete a Karma=====//
router.delete('/:id(\\d+)', asyncHandler(async(req, res, next) => {
    const karmaId = req.params.id;
    const karma = await db.Karma.findByPk(karmaId);
    await karma.destroy();
    console.log("!!!!!!")
    res.json({karmaId});
}));


module.exports = router;
