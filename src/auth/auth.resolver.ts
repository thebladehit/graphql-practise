import { Resolver, Mutation, Args, OmitType } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { SignupInputDto } from './dto/signup-input.dto';
import { SignResponse } from './dto/sign-response.dto';
import { SignInInputDto } from './dto/signin-input.dto';
import { Public } from './decorators/public.decorator';
import { UseGuards } from '@nestjs/common';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { CurrentUser } from './decorators/currentUser.decorator';
import { JwtPayloadWithRefreshToken } from './types/types';
import { RefreshTokensResponse } from './dto/refresh-tokens-response.dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => SignResponse)
  signup(@Args('signUpInput') signUpInput: SignupInputDto) {
    return this.authService.signUp(signUpInput);
  }

  @Public()
  @Mutation(() => SignResponse)
  signin(@Args('signInInput') signInInput: SignInInputDto) {
    return this.authService.signIn(signInInput);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Mutation(() => RefreshTokensResponse)
  refreshTokens(@CurrentUser() user: JwtPayloadWithRefreshToken) {
    return this.authService.refreshTokens(user.userId, user.refreshToken);
  }
}
