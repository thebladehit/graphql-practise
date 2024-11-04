import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NoteService } from './note.service';
import { Note } from './entities/note.entity';
import { CreateNoteInput } from './dto/create-note.input';
import { CurrentUser } from '../auth/decorators/currentUser.decorator';
import { JwtPayload } from '../auth/types/types';
import { UpdateNoteInput } from './dto/update-note.input';

@Resolver(() => Note)
export class NoteResolver {
  constructor(private readonly noteService: NoteService) {
  }

  @Mutation(() => Note, { name: 'createNote' })
  create(
    @Args('createNoteInput') createNoteInput: CreateNoteInput,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.noteService.create(createNoteInput, user.userId);
  }

  @Query(() => [Note], { name: 'notes' })
  findAll(@CurrentUser() user: JwtPayload) {
    return this.noteService.findAll(user.userId);
  }

  @Query(() => Note, { name: 'note' })
  findOne(@Args('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.noteService.findOne(id, user.userId);
  }

  @Mutation(() => Note)
  updateNote(
    @Args('updateNoteInput') updateNoteInput: UpdateNoteInput,
    @Args('id') id: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.noteService.update(id, user.userId, updateNoteInput);
  }

  @Mutation(() => Note)
  removeNote(
    @Args('id') id: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.noteService.remove(id, user.userId);
  }
}
