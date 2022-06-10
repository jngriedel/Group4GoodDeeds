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
router.post('/', karmaValidators, requireAuth, asyncHandler(async(req, res, next) => {
    const { title } = req.body;

    const validatorErrors = validationResult(req);



    if (validatorErrors.isEmpty()) {
        //check if duplicate
        const dupe = await db.Karma.findOne({
            where: {
                title,
                userId: res.locals.user.id,
            }
        })

        if(dupe) res.json({message: 'Dupe'})
        else {
        const karma = await db.Karma.create({
            title,
            userId: res.locals.user.id,
        });
        await karma.save();

        res.json({message: 'Success!', karma});
    }
    } else {
        const errors = validatorErrors.array().map(error => error.msg);

        res.json({errors})

    };
}));


//====Update a Karma Name====//
router.put('/:id(\\d+)', karmaValidators, requireAuth, async(req, res) => {
    const karmaId = req.params.id;
    const karma = await db.Karma.findByPk(karmaId);
    const oldTitle = req.body.oldTitle;
    karma.title = req.body.title;
    const title = karma.title
    const validatorErrors = validationResult(req);

    if(validatorErrors.isEmpty()){

        await karma.save();
        const list = await db.Karma.findAll({
            where: {
                title,
                userId: res.locals.user.id,
            }
        })

        if (list.length === 1) {
        res.json({message: 'Success!', karma});
        } else if (list.length > 1) {
            karma.title = oldTitle;
            karma.save();
            res.json({message: 'Dupe'});
        }
    }
    else {
        const errors = validatorErrors.array().map(error => error.msg);

        res.json({errors})

    };
});

//====Delete a Karma=====//
router.delete('/:id(\\d+)', requireAuth, asyncHandler(async(req, res, next) => {
    const karmaId = req.params.id;
    await db.KarmasToDeed.destroy({where:{

            karmaId,
        }})

    const karma = await db.Karma.findByPk(karmaId);
    await karma.destroy();

    res.json({karmaId});
}));


module.exports = router;
