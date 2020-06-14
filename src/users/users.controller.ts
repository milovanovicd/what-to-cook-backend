import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('signup')
  async signUp(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const signUpResponse = await this.userService.signUp(email, password);
    return {
      id: signUpResponse.id,
      message: signUpResponse.message,
    };
  }

  @Get()
  async getAllRecipes() {
    const recipes = await this.userService.fetchUsers();
    return recipes;
  }

  @Get(':email')
  getRecipe(@Param('email') email) {
    return this.userService.getUser(email);
  }
}
