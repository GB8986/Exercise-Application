const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');



//get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });

    res.status(200).json(workouts)
}

//get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such workout' });
    }

    const workout = await Workout.findById(id);

    if (!workout) {
        return res.status(404).json({ error: 'no such workout' });
    }
    res.status(200).json(workout);
}


//create new workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;

    let emptyFeilds = []

    if (!title) {
        emptyFeilds.push('title')
    }
    if (!load) {
        emptyFeilds.push('load')
    }
    if (!reps) {
        emptyFeilds.push('reps')
    }
    if (emptyFeilds.length > 0) {
        return res.status(400).json({ error: 'Please fill in the following fields', emptyFeilds });
    }


    try {
        const workout = await Workout.create({ title, reps, load });
        res.status(200).json(workout);
    }
    catch (err) {
        res.status(400).json({ error: error.message });
    }
}

//delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such workout' });
    }
    const workout = await Workout.findByIdAndDelete({ _id: id });

    if (!workout) {
        return res.status(404).json({ error: 'no such workout' });
    }
    res.status(200).json(workout);

}

//update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such workout' });
    }
    const workout = await Workout.findOneAndUpdate({ _id: id },
        {
            ...req.body,
        });

    if (!workout) {
        return res.status(404).json({ error: 'no such workout' });
    }
    res.status(200).json(workout);
}


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout

}