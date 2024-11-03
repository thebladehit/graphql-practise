import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupInputDto } from '../auth/dto/signup-input.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: SignupInputDto, hashedPassword: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        password: hashedPassword,
      },
    })
  }

  findByEmailOrId(emailOrId: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        OR: [
          { email: emailOrId },
          { id: emailOrId },
        ]
      },
    });
  }

  update(userId: string, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data
    });
  }
}
