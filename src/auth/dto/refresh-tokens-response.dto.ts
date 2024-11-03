import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RefreshTokensResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
