
const express = require('express');
const Workout = require('../models/workoutModel');
const router = express.Router();
const { createWorkout,
    getWorkout,
    getWorkouts,
    updateWorkout,
    deleteWorkout,

} = require('../controllers/workoutController');

router.get('/', getWorkouts);


// get single workout
router.get('/:id', getWorkout);


//post a workout

router.post('/', createWorkout);


//DELETE a workout
router.delete('/:id', deleteWorkout);

//UPDATE a workout
router.patch('/:id', updateWorkout);

module.exports = router;