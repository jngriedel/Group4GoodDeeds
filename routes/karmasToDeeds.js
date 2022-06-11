//=====External Imports=====//
const express = require('express');
const { check, validationResult } = require('express-validator');

//=====Internal Imports=====//
const { csrfProtection, asyncHandler } = require('./utils');
const db  = require('../db/models');
const { requireAuth } = require('../auth');

//======Initialize===//
const router = express.Router();




router.post('/:karmaId(\\d+)/:deedId(\\d+)', requireAuth, asyncHandler(async (req,res)=> {
const karmaId = req.params.karmaId
const deedId = req.params.deedId
const karma = await db.Karma.findByPk(karmaId)
const newLink = await db.KarmasToDeed.create({
    karmaId,
    deedId,
})
res.json({message: "Success!", karma})

}))

router.post('/:karmaId(\\d+)/:deedId(\\d+)/delete', requireAuth, asyncHandler(async (req,res)=> {
    const karmaId = req.params.karmaId
    const deedId = req.params.deedId
    const karma = await db.Karma.findByPk(karmaId)
    const link = await db.KarmasToDeed.findOne({
        where: {

        karmaId,
        deedId,
        }
    })
    await link.destroy()
    res.json({message: "Success!", karma})

}))



module.exports = router;
