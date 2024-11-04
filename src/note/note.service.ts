import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateNoteInput } from './dto/create-note.input';
import { NoteRepository } from '../repositories/note.repository';
import { Note } from '@prisma/client';

@Injectable()
export class NoteService {
  constructor(private readonly noteRepository: NoteRepository) {}

  create(createNoteInput: CreateNoteInput, userId: string): Promise<Note> {
    return this.noteRepository.create(createNoteInput, userId);
  }

  findAll(userId: string): Promise<Note[]> {
    return this.noteRepository.getAll(userId);
  }

  async findOne(id: string, userId: string): Promise<Note> {
    const note = await this.noteRepository.getOne(id);
    if (!note) {
      throw new NotFoundException('No note with such id');
    }
    if (note.userId !== userId) {
      throw new ForbiddenException('You do not have access to this data');
    }
    return note;
  }

  async update(id: string, userId: string, updateNoteInput: Partial<CreateNoteInput>): Promise<Note> {
    const note = await this.noteRepository.getOne(id);
    if (!note) {
      throw new NotFoundException('No note with such id');
    }
    if (note.userId !== userId) {
      throw new ForbiddenException('You do not have access to this data');
    }
    return this.noteRepository.update(id, updateNoteInput);
  }

  async remove(id: string, userId: string): Promise<Note> {
    const note = await this.noteRepository.getOne(id);
    if (!note) {
      throw new NotFoundException('No note with such id');
    }
    if (note.userId !== userId) {
      throw new ForbiddenException('You do not have access to this data');
    }
    return this.noteRepository.delete(id);
  }
}
