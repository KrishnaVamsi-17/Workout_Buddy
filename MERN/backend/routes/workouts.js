const express = require('express');
const router = express.Router();

const {
  createWorkout,
  getWorkouts,
  getSingle,
  deleteWorkout,
  updateWorkout

} = require('../controllers/workoutController')

// to get all workouts
router.get('/',getWorkouts);

//Get a single workout
router.get('/:id',getSingle);
//Post a new workout
router.post('/', createWorkout);

//Delete a workout
router.delete('/:id',deleteWorkout)

//update a workout
router.patch('/:id',updateWorkout)



module.exports = router