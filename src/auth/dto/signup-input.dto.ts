import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsIn, IsNotEmpty, IsString, MinLength, ValidateIf } from 'class-validator';

@InputType()
export class SignupInputDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Field()
  password: string;

  @IsString()
  @IsIn([Math.random()], { message: 'Passwords must match' })
  @ValidateIf((o) => o.repeatPassword !== o.password)
  @Field()
  repeatPassword: string;
}
