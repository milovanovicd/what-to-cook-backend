import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

// export type User = any;

@Injectable()
export class UsersService {
  // private readonly users: User[];

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  //   this.users = [
  //     {
  //       userId: 1,
  //       username: 'dejan@gmail.com',
  //       password: 'dejan1997',
  //     },
  //     {
  //       userId: 2,
  //       username: 'chris',
  //       password: 'secret',
  //     },
  //     {
  //       userId: 3,
  //       username: 'maria',
  //       password: 'guess',
  //     },
  //   ];
  // }

  // async findOne(email: string): Promise<User | undefined> {
  //   return this.users.find(user => user.email === email);
  // }


  async getUser(email: string){
    const user = await this.userModel.findOne({ email: email }).exec();
    return {
      id: user.id,
      email: user.email,
      password: user.password
    };
    // return user;
  }

  async signUp(email: string, password: string) {
    const newUser = new this.userModel({
      email,
      password,
    });

    const userExists = await this.checkIfUserExists(email);
    if (userExists) {
      return {
        id: -1,
        message: 'User with same email exists! Please login with that email',
      };
    } else {
      //mongoose .save() metoda - kreira query
      const result = await newUser.save();
      return {
        id: result.id as string,
        message: 'You have signed up sucessfully! Please login now!',
      };
    }
  }

  async fetchUsers() {
    const recipes = await this.userModel.find().exec();
    return recipes.map(u => ({
      userId: u.id,
      email: u.email,
      password: u.password,
    }));
  }

  private async checkIfUserExists(email: string) {
    return this.userModel
      .findOne({ email: email })
      .then(user => (user ? true : false))
      .catch(() => false);
  }

}
