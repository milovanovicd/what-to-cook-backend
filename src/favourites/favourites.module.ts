import { Module } from '@nestjs/common';
import { FavouritesController } from './favourites.controller';
import { FavouritesService } from './favourites.service';
import { MongooseModule } from '@nestjs/mongoose';
import {FavouriteSchema} from './favourite.model';
import { RecipesModule } from 'src/recipes/recipes.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'Favourite', schema:FavouriteSchema}]),
     RecipesModule],
  controllers: [FavouritesController],
  providers: [FavouritesService]
})
export class FavouritesModule {}
