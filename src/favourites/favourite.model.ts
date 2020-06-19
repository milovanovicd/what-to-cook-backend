import * as mongoose from 'mongoose';

export const FavouriteSchema = new mongoose.Schema({
  userId: String,
  recipeId: String,
});

export interface Favourite extends mongoose.Document {
  userId: string;
  recipeId: string;
}
