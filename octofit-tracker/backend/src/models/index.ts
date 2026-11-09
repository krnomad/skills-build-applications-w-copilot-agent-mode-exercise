import { model, Schema, Types } from 'mongoose';

interface UserDocument {
  name: string;
  email: string;
  username: string;
  team?: Types.ObjectId;
}

interface TeamDocument {
  name: string;
  description: string;
  members: Types.ObjectId[];
}

interface ActivityDocument {
  user: Types.ObjectId;
  team: Types.ObjectId;
  activityType: string;
  durationMinutes: number;
  distanceKm: number;
  calories: number;
  date: Date;
}

interface LeaderboardDocument {
  user: Types.ObjectId;
  team: Types.ObjectId;
  points: number;
  period: string;
}

interface WorkoutDocument {
  name: string;
  activityType: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  description: string;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
);

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

const activitySchema = new Schema<ActivityDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, required: true, min: 0 },
    calories: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true },
  },
  { timestamps: true },
);

const leaderboardSchema = new Schema<LeaderboardDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    period: { type: String, required: true },
  },
  { timestamps: true },
);

const workoutSchema = new Schema<WorkoutDocument>(
  {
    name: { type: String, required: true, unique: true },
    activityType: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export const User = model<UserDocument>('User', userSchema, 'users');
export const Team = model<TeamDocument>('Team', teamSchema, 'teams');
export const Activity = model<ActivityDocument>('Activity', activitySchema, 'activities');
export const Leaderboard = model<LeaderboardDocument>(
  'Leaderboard',
  leaderboardSchema,
  'leaderboards',
);
export const Workout = model<WorkoutDocument>('Workout', workoutSchema, 'workouts');
