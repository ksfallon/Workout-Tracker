// need to require the express Router here so we can access the api files/routes
const router = require('express').Router()
// need to require the model Workouts so we can GET, POST, PUT and DELETE data from the database through the model.
const Workouts = require('../models/Workouts')

// I need to create a routes to do GET POST PUT DELETE

//FIRST NEED TO GET MOST RECENT WORKOUT AND COMBINE ALL EXERCISES
    // need to be for most recent workout BY DATE
    // add HOW MANY Exercises (length of the array)
    // TOTAL AMOUNT OF TIME of ALL EXERCISES
    // TOTAL WEIGHT LIFTED of ALL EXERCISES
    // TOTAL SETS PERFORMED of ALL EXERCISES
    // TOTAL REPS PERFORMED of ALL EXERCISES
    // TOTAL SETS DISTANCE of ALL EXERCISES
router.get('/api/workouts', (req, res) => {
    Workouts.aggregate({
            $addFields: {
                // totalExercises: {$add: "exercises"}, // I feel like I need array length here
                totalDuration: {$sum: "$exercises.duration"},
                totalWeight: {$sum: "$exercises.weight"},
                totalReps: {$sum: "$exercises.reps"},
                totalSets: {$sum: "$exercises.sets"},
                totalDistance: {$sum: "$exercises.distance"},
            }
        }).then(dbWorkouts => {
            res.json(dbWorkouts)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})


//SECOND TO CONTINUE a workout we need to PUT to UPDATE THE CURRENT WORKOUT

//THIRD TO ADD NEW WORKOUT we need a POST to CREATE the NEW WORKOUT
router.post('/api/workouts', ({body}, res) => {
    Workouts.create(body)
    .then(dbWorkouts => {
        res.json(dbWorkouts)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})


module.exports = router