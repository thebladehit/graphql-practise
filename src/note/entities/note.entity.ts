import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Note {
  @Field()
  id: string

  @Field()
  title: string

  @Field()
  body: string

  @Field()
  userId: string;
}
