import { Injectable, NotFoundException } from '@nestjs/common';

import { Recipe } from './recipe.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RecipesService {
//   private _recipes: Recipe[] = [];

  constructor(
    @InjectModel('Recipe') private readonly recipeModel: Model<Recipe>,
  ) {}

  async addRecipe(
    userId: string,
    title: string,
    description: string,
    imageUrl: string,
    ingredients: string[],
    cookingTime: number,
    isFavourite: boolean,
    category
  ) {
    // const recipeId = Math.random().toString();
    const newRecipe = new this.recipeModel({
      userId,
      title,
      description,
      imageUrl,
      ingredients,
      cookingTime,
      isFavourite,
      category
    });
    // this._recipes.push(newRecipe);
    //mongoose .save() metoda - kreira query
    const result = await newRecipe.save();
    return result.id as string;
  }

  async fetchRecipes() {
    const recipes = await this.recipeModel.find().exec();
    return recipes.map(r => ({
      id: r.id,
      userId: r.userId,
      title: r.title,
      description: r.description,
      imageUrl: r.imageUrl,
      ingredients: r.ingredients,
      cookingTime: r.cookingTime,
      isFavourite: r.isFavourite,
      category:r.category
    }));
  }

  async getRecipe(recipeId: string) {
    const recipe = await this.findRecipe(recipeId);
    return {
      id: recipe.id,
      userId: recipe.userId,
      title: recipe.title,
      description: recipe.description,
      imageUrl: recipe.imageUrl,
      ingredients: recipe.ingredients,
      cookingTime: recipe.cookingTime,
      isFavourite: recipe.isFavourite,
      category:recipe.category
    };
  }

  async updateRecipe(
    recipeId: string,
    title: string,
    description: string,
    ingredients: string[],
    cookingTime: number,
    category:string
  ) {
    const updatedRecipe = await this.findRecipe(recipeId);

    if (title) {
      updatedRecipe.title = title;
    }
    if (description) {
      updatedRecipe.description = description;
    }
    if (ingredients) {
      updatedRecipe.ingredients = ingredients;
    }
    if (cookingTime) {
      updatedRecipe.cookingTime = cookingTime;
    }
    if (category) {
      updatedRecipe.category = category;
    }
    updatedRecipe.save();
  }

  async removeRecipe(recipeId) {
    //Korisitimo _id jer je tako zapisano u bazi id je samo getter
    const result = await this.recipeModel.deleteOne({ _id: recipeId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find recipe!');
    }
  }

  private async findRecipe(id: string): Promise<Recipe> {
    let recipe;
    try {
      recipe = await this.recipeModel.findById(id).exec();
    } catch {
      throw new NotFoundException('Could not find recipe!');
    }

    if (!recipe) {
      throw new NotFoundException('Could not find recipe!');
    }

    return recipe;
  }
}
