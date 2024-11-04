import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteResolver } from './note.resolver';
import { NoteRepository } from '../repositories/note.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [NoteResolver, NoteService, NoteRepository, PrismaService],
})
export class NoteModule {}
