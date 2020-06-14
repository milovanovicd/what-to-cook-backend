import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

export interface User extends mongoose.Document {
  userId: string;
  email: string;
  password: string;
}
