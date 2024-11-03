import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { SignupInputDto } from './dto/signup-input.dto';
import { SignResponse } from './dto/sign-response.dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignResponse)
  signup(@Args('signUpInput') signUpInput: SignupInputDto) {
    return this.authService.signUp(signUpInput);
  }

  // @Query(() => String, { name: 'auth' })
  // findAll() {
  //   return this.authService.findAll();
  // }
}
