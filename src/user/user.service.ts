import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { SignupInputDto } from '../auth/dto/signup-input.dto';
import { UserRepository } from '../repositories/user.repository';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(signUpInput: SignupInputDto, hashedPassword: string): Promise<User> {
    const user = await this.userRepository.findByEmailOrId(signUpInput.email);
    if (user) {
      throw new BadRequestException('User with such email is already exists');
    }
    return this.userRepository.create(signUpInput, hashedPassword);
  }

  async getUser(emailOrId: string): Promise<User> {
    const user = await this.userRepository.findByEmailOrId(emailOrId);
    if (!user) {
      throw new NotFoundException('No user with such email or id');
    }
    return user;
  }

  async update(userId: string, userUpdateDto: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findByEmailOrId(userId);
    if (!user) {
      throw new NotFoundException('No user with such email or id');
    }
    return this.userRepository.update(userId, userUpdateDto);
  }
}
