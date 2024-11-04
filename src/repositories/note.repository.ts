import { Injectable } from '@nestjs/common';
import { CreateNoteInput } from '../note/dto/create-note.input';
import { Note } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NoteRepository {
  constructor(private readonly prisma: PrismaService) {
  }

  create(dto: CreateNoteInput, userId: string): Promise<Note> {
    return this.prisma.note.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  getAll(userId: string): Promise<Note[]> {
    return this.prisma.note.findMany({ where: { userId } });
  }

  getOne(id: string): Promise<Note> {
    return this.prisma.note.findUnique({ where: { id } });
  }

  update(id: string, data: Partial<CreateNoteInput>): Promise<Note> {
    return this.prisma.note.update({
      where: { id: id },
      data,
    });
  }

  delete(id: string): Promise<Note> {
    return this.prisma.note.delete({ where: { id } });
  }
}
