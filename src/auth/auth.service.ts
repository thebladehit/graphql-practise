import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignupInputDto } from './dto/signup-input.dto';
import * as argon from 'argon2';
import { UserRepository } from '../repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignResponse } from './dto/sign-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
  }

  async signUp(signUpInput: SignupInputDto): Promise<SignResponse> {
    const hashedPassword = await argon.hash(signUpInput.password);
    const user = await this.userService.create(signUpInput, hashedPassword);
    const { accessToken, refreshToken } = this.createTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken, user };
  }

  // findAll() {
  //   return `This action returns all auth`;
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }
  //
  // update(id: number, updateAuthInput: UpdateAuthInput) {
  //   return `This action updates a #${id} auth`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }

  private createTokens(userId: string, email: string) {
    const accessToken = this.jwtService.sign({ userId, email }, {
      expiresIn: '15m',
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
    });
    const refreshToken = this.jwtService.sign({ userId, email }, {
      expiresIn: '7d',
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
    });
    return { accessToken, refreshToken };
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await argon.hash(refreshToken);
    await this.userRepository.update(userId, { refreshToken: hashedRefreshToken });
  }
}
