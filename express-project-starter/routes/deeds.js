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
    }})
    res.render('deed',  {
      title: `Deed #${deedId}`,
      deed,
      reviews,
      csrfToken: req.csrfToken()
    })
}));



//==========Post Review on Deed Page============

router.post('/:id(\\d+)', csrfProtection, asyncHandler(async(req, res) => {
    const deedId = req.params.id
    const {title, body, rating} = req.body


    res.send('deed',  {
      title: `Deed #${deedId}`,
      deed,
      csrfToken: req.csrfToken()
    });
}));











module.exports = router;
