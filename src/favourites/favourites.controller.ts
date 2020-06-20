import { Controller, Post, Body, Delete, Get, Param } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { RecipesService } from 'src/recipes/recipes.service';

@Controller('favourites')
export class FavouritesController {
    constructor(private favService:FavouritesService, private recipeService:RecipesService){}
    
    @Post()
    async addToFavourite(
        @Body('userId') userId: string,
        @Body('recipeId') recipeId: string,
    ){
        const result = await this.favService.addToFavourites(userId,recipeId);
        const recipe = await this.recipeService.getRecipe(result.recipeId);
        return {
            userId: result.userId,
            recipe: recipe
        };
    }

    @Post('remove')
    async removeFromFavourites(
        @Body('userId') userId: string,
        @Body('recipeId') recipeId: string,
    ){
        await this.favService.removeFromFavourites(userId,recipeId);
        return null;
        // return result;
    }

    @Post('remove-by-recipe')
    async removeFromFavouritesByRecipeId(
        @Body('recipeId') recipeId: string,
    ){
        await this.favService.removeFromFavouritesById(recipeId);
        return null;
        // return result;
    }

    @Get()
    async getAll(){
        const favs = await this.favService.getAllFavourites();
        return favs;
    }

    @Get(':userId')
    async getFavRecipesByUser(@Param('userId') userId){
        const favs = await this.favService.getAllFavouriteByUser(userId);
        const recipes = await this.recipeService.fetchRecipes();
        const favRecipes = [];
        let recipe;

        favs.forEach(el => {
            recipe = recipes.find(x => x.id === el.recipeId);
            favRecipes.push(recipe);
        });

        return favRecipes;
    }
}
