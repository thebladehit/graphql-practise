import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateNoteInput {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @Field()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  body: string;
}
