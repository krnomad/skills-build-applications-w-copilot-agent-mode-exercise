import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

const apiRouter = Router();

apiRouter.get('/users/', async (_request, response) => {
  response.json(await User.find().lean());
});

apiRouter.get('/teams/', async (_request, response) => {
  response.json(await Team.find().lean());
});

apiRouter.get('/activities/', async (_request, response) => {
  response.json(await Activity.find().lean());
});

apiRouter.get('/leaderboard/', async (_request, response) => {
  response.json(await Leaderboard.find().lean());
});

apiRouter.get('/workouts/', async (_request, response) => {
  response.json(await Workout.find().lean());
});

export default apiRouter;
