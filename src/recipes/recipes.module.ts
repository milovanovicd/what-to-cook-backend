import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { RecipeSchema } from './recipe.model';

@Module({
  imports: [MongooseModule.forFeature([{name:'Recipe', schema:RecipeSchema}])],
  controllers: [RecipesController],
  providers: [RecipesService],
  exports:[RecipesService]
})
export class RecipesModule {}
