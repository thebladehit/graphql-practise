import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignupInputDto } from './dto/signup-input.dto';
import * as argon from 'argon2';
import { UserRepository } from '../repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignResponse } from './dto/sign-response.dto';
import { SignInInputDto } from './dto/signin-input.dto';

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

  async signIn(signInInput: SignInInputDto): Promise<SignResponse> {
    const user = await this.userService.getUser(signInInput.email);
    const isPasswordMatch = await argon.verify(user.password, signInInput.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Incorrect password');
    }
    const { accessToken, refreshToken } = this.createTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken, user };
  }

  async refreshTokens(userId: string, rt: string): Promise<Omit<SignResponse, 'user'>> {
    const user = await this.userService.getUser(userId);
    const isRefreshTokenMatch = await argon.verify(user.refreshToken, rt);
    if (!isRefreshTokenMatch) {
      throw new UnauthorizedException('Refresh token is invalid');
    }
    const { accessToken, refreshToken } = this.createTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken };
  }

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

  private async updateRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await argon.hash(refreshToken);
    await this.userRepository.update(userId, { refreshToken: hashedRefreshToken });
  }
}
