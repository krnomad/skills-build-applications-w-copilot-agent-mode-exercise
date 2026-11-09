import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    const users = await Promise.all([
      User.findOneAndUpdate(
        { email: 'maya.chen@example.com' },
        { $set: { name: 'Maya Chen', username: 'mayaruns' } },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      ),
      User.findOneAndUpdate(
        { email: 'leo.martinez@example.com' },
        { $set: { name: 'Leo Martinez', username: 'leocycling' } },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      ),
      User.findOneAndUpdate(
        { email: 'amina.patel@example.com' },
        { $set: { name: 'Amina Patel', username: 'aminamoves' } },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      ),
    ]);

    const teams = await Promise.all([
      Team.findOneAndUpdate(
        { name: 'Trail Blazers' },
        {
          $set: {
            description: 'A team for runners who love exploring local trails.',
            members: [users[0]._id, users[2]._id],
          },
        },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      ),
      Team.findOneAndUpdate(
        { name: 'City Spinners' },
        {
          $set: {
            description: 'Cyclists building consistency one ride at a time.',
            members: [users[1]._id],
          },
        },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
      ),
    ]);

    await Promise.all([
      User.updateOne({ _id: users[0]._id }, { $set: { team: teams[0]._id } }),
      User.updateOne({ _id: users[1]._id }, { $set: { team: teams[1]._id } }),
      User.updateOne({ _id: users[2]._id }, { $set: { team: teams[0]._id } }),
    ]);

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const activities = [
      {
        user: users[0],
        team: teams[0],
        activityType: 'run',
        durationMinutes: 32,
        distanceKm: 5.2,
        calories: 340,
        daysAgo: 0,
      },
      {
        user: users[1],
        team: teams[1],
        activityType: 'cycling',
        durationMinutes: 48,
        distanceKm: 16.4,
        calories: 420,
        daysAgo: 0,
      },
      {
        user: users[2],
        team: teams[0],
        activityType: 'walk',
        durationMinutes: 40,
        distanceKm: 3.1,
        calories: 180,
        daysAgo: 1,
      },
      {
        user: users[0],
        team: teams[0],
        activityType: 'strength',
        durationMinutes: 35,
        distanceKm: 0,
        calories: 260,
        daysAgo: 2,
      },
    ];

    await Promise.all(
      activities.map(({ user, team, daysAgo, ...activity }) => {
        const date = new Date(today);
        date.setUTCDate(date.getUTCDate() - daysAgo);
        return Activity.findOneAndUpdate(
          { user: user._id, activityType: activity.activityType, date },
          { $set: { ...activity, user: user._id, team: team._id, date } },
          { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
        );
      }),
    );

    const leaderboardPoints = [320, 280, 245];
    await Promise.all(
      users.map((user, index) =>
        Leaderboard.findOneAndUpdate(
          { user: user._id, period: 'weekly' },
          {
            $set: {
              user: user._id,
              team: teams[index === 1 ? 1 : 0]._id,
              points: leaderboardPoints[index],
              period: 'weekly',
            },
          },
          { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
        ),
      ),
    );

    const workouts = [
      {
        name: 'Easy 5K Builder',
        activityType: 'run',
        difficulty: 'beginner' as const,
        durationMinutes: 30,
        description: 'An easy-paced run with a short warm-up and cool-down.',
      },
      {
        name: 'Hill Strength Ride',
        activityType: 'cycling',
        difficulty: 'intermediate' as const,
        durationMinutes: 45,
        description: 'A steady ride with several controlled hill efforts.',
      },
      {
        name: 'Full Body Basics',
        activityType: 'strength',
        difficulty: 'beginner' as const,
        durationMinutes: 25,
        description: 'A balanced bodyweight routine focused on good form.',
      },
    ];

    await Promise.all(
      workouts.map((workout) =>
        Workout.findOneAndUpdate(
          { name: workout.name },
          { $set: workout },
          { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
        ),
      ),
    );

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
