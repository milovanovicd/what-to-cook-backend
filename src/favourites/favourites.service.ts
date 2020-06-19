import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favourite } from './favourite.model';

@Injectable()
export class FavouritesService {

    constructor(@InjectModel('Favourite') private favouriteModel:Model<Favourite>){}

    async addToFavourites(userId:string,recipeId:string){
        const newFavourite = new this.favouriteModel({userId,recipeId});
        const result = await newFavourite.save();
        return result;
    }

    async removeFromFavourites(userId:string,recipeId:string){
        const favouriteToDelete = await this.favouriteModel.findOne({ userId: userId,recipeId:recipeId});
        const idToDelete = favouriteToDelete._id;

        const result = await this.favouriteModel.deleteOne({_id:idToDelete}).exec();
        if ((await result).n === 0) {
            throw new NotFoundException('Could not find Favourite!');
        }
        return favouriteToDelete;
    }

    async getAllFavourites(){
        const favourites = await this.favouriteModel.find().exec();
        return favourites;
    }

    async getAllFavouriteByUser(userId:string){
        const favourites = await this.favouriteModel.find({userId:userId}).exec();
        return favourites;
    }
}
