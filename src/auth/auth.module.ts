import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repositories/user.repository';

@Module({
  providers: [
    AuthResolver,
    AuthService,
    PrismaService,
    UserService,
    JwtService,
    UserRepository
  ],
})
export class AuthModule {}
