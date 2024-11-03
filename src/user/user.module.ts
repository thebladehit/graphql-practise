import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserRepository } from '../repositories/user.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [UserResolver, UserService, UserRepository, PrismaService],
})
export class UserModule {}
