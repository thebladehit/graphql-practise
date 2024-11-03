import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { SignupInputDto } from '../auth/dto/signup-input.dto';
import { UserRepository } from '../repositories/user.repository';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(signUpInput: SignupInputDto, hashedPassword: string): Promise<User> {
    const user = await this.userRepository.findByEmail(signUpInput.email);
    if (user) {
      throw new BadRequestException('User with such email is already exists');
    }
    return this.userRepository.create(signUpInput, hashedPassword);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
