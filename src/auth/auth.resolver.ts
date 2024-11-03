import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { SignupInputDto } from './dto/signup-input.dto';
import { SignResponse } from './dto/sign-response.dto';
import { SignInInputDto } from './dto/signin-input.dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignResponse)
  signup(@Args('signUpInput') signUpInput: SignupInputDto) {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => SignResponse)
  signin(@Args('signInInput') signInInput: SignInInputDto) {
    return this.authService.signIn(signInInput);
  }

  // @Query(() => String, { name: 'auth' })
  // findAll() {
  //   return this.authService.findAll();
  // }
}
