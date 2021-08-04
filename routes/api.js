// need to require the express Router here so we can access the api files/routes
const router = require('express').Router()
// need to require the model Workouts so we can GET, POST, PUT and DELETE data from the database through the model.
const Workouts = require('../models/Workouts')

// I need to create a routes to do GET POST PUT 
router.get('/api/workouts', (req, res) => {
    Workouts.aggregate([{
            $addFields: {
                totalDuration: {$sum: "$exercises.duration"},
            }
        }]).then(dbWorkouts => {
            res.json(dbWorkouts)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})
//TO ADD NEW WORKOUT we need a POST to CREATE the NEW WORKOUT
router.post('/api/workouts', (req, res) => {
    Workouts.create({})
    .then((response) => {
        res.json(response)
    })
    .catch((err) => {
        res.json(err)
    })
})

//TO CONTINUE a workout we need to PUT to UPDATE THE CURRENT WORKOUT
router.put('/api/workouts/:id', (req, res) => {
    Workouts.findByIdAndUpdate(
        {"_id": req.params.id},

        {$push: {"exercises": req.body}}
    )
    .then(response => {
        res.json(response)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

// to GET the RANGE of WORKOUTS for LAST SEVEN DAYS
router.get('/api/workouts/range', (req, res) => {
    Workouts.aggregate([{
            $addFields: {
                totalWeight: {$sum: "$exercises.weight"},
            }
        }]).then(dbWorkouts => {
            res.json(dbWorkouts)
        })
        .catch(err => {
            res.status(400).json(err)
        })
});

module.exports = router

//FIRST NEED TO GET MOST RECENT WORKOUT AND COMBINE ALL EXERCISES
    // need to be for most recent workout BY DATE
    // add HOW MANY Exercises (length of the array)
    // TOTAL AMOUNT OF TIME of ALL EXERCISES
    // TOTAL WEIGHT LIFTED of ALL EXERCISES
    // TOTAL SETS PERFORMED of ALL EXERCISES
    // TOTAL REPS PERFORMED of ALL EXERCISES
    // TOTAL SETS DISTANCE of ALL EXERCISES
