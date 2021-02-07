const express = require('express');
const { check, validationResult } = require('express-validator')

const Spot = require('../models/Spot')

const router = express.Router();

const validate = [
    check('title')
        .isLength({ min: 3, max: 50 })
        .withMessage('Title should be between 3 and 50 characters.'),
    check('address')
        .isLength({ min: 10, max: 100 })
        .withMessage('Title should be between 10 and 100 characters.'),
    check('description')
        .isLength({ min: 10, max: 200 })
        .withMessage('Description should be between 10 and 200 characters.'),
]

// /api/spots
router.post('/', validate, (req, res) => {

    const errors = validationResult(req);

    if( !errors.isEmpty() ) {
        return res.status(422).send({ errors: errors.array() })
    }

    const spot = new Spot({
        // KVPs
        title: req.body.title,
        address: req.body.address,
        city: req.body.city,
        description: req.body.description,
        image: req.body.image,
    });

    spot.save()
        .then(result => {
            res.send({
                message: "Spot data created successfully",
                data: result
            })
        })
        .catch(err => console.log(err))

})

// handles api/spots get request
// shows all
router.get('/', (req, res) => {
    Spot.find()
        .then(spots => {
            res.send(spots)
        })
        .catch(err => console.log(err))
});

// get one by id
router.get('/:id', (req, res) => {
    const spotId = req.params.id;

    Spot.findById(spotId)
        .then(spot => {
            res.send(spot)
        })
        .catch(err => console.log(err))
})

// UPDATE
router.put('/:id', validate, (req, res) => {
    const spotId = req.params.id;

    const errors = validationResult(req);

    if( !errors.isEmpty() ) {
        return res.status(422).send({ errors: errors.array() })
    }

    Spot.findById(spotId)
    .then(spot => {
        spot.title = req.body.title;
        spot.address = req.body.address;
        spot.homeType = req.body.homeType;
        spot.description = req.body.description;
        spot.price = req.body.price;
        spot.image = req.body.image;
        spot.yearBuilt = req.body.yearBuilt;

        return spot.save();
    })
    .then(result => {
        res.send(result)
    })
    .catch(err => console.log(err))
})

// DELETE
router.delete('/:id', (req, res) => {
    const spotId = req.params.id
    
    Spot.findByIdAndRemove(spotId)
    .then(result => {
        res.send(result)
    })
    .catch(err => console.log(err))
})

module.exports = router