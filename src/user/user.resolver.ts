import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CurrentUser } from '../auth/decorators/currentUser.decorator';
import { JwtPayload, JwtPayloadWithRefreshToken } from '../auth/types/types';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'user' })
  getUser(@CurrentUser() user: JwtPayload) {
    return this.userService.getUser(user.userId);
  }

  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput') updateUserDto: UpdateUserInput,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.userService.update(user.userId, updateUserDto);
  }
}
