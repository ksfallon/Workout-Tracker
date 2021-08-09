// need to require the express Router here so we can access the api files/routes
const router = require('express').Router()
// need to require the model Workouts so we can GET, POST, PUT and DELETE data from the database through the model.
const Workouts = require('../models/Workouts')

// I need to create a routes to do GET POST PUT 
// use AGGREGATE -
    // Use addFields or set (def for both): appends new fields to existing documents, can include one or more set/addField stages in an aggregation
router.get('/api/workouts', (req, res) => {
    Workouts.aggregate([{
            $addFields: {totalDuration: {$sum: "$exercises.duration"}}
        }]).then(resWorkouts => {
            res.json(resWorkouts)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})
//TO ADD NEW WORKOUT we need a POST to CREATE the NEW WORKOUT
// Don't need to pass anything through the workout create. it knows to just send it to the model
router.post('/api/workouts', (req, res) => {
    Workouts.create({})
    .then((resWorkouts) => {
        res.json(resWorkouts)
    })
    .catch((err) => {
        res.json(err)
    })
})

//TO CONTINUE a workout we need to PUT to UPDATE THE CURRENT WORKOUT
router.put('/api/workouts/:id', (req, res) => {
    Workouts.findByIdAndUpdate(
        req.params.id,

        {$push: {"exercises": req.body}}
    )
    .then(resWorkouts => {
        res.json(resWorkouts)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

// to GET the RANGE of WORKOUTS for LAST SEVEN DAYS
router.get('/api/workouts/range', (req, res) => { 
    Workouts.aggregate([
        // we need to get the get the totalDuration
            {$addFields: {totalDuration: {$sum: "$exercises.duration"}}}, 
            {$sort: {"day": -1}}, // should sort in descending order because we want to start with more recent day. **I've tried as date and day
            {$limit: (7)} // want to start with our most recent day and work backwards, so the most recent 7 days, the last 7 documents

        ]).then(resWorkouts => {
            res.json(resWorkouts)
        })
        .catch(err => {
            res.status(400).json(err)
        })
});

module.exports = router


