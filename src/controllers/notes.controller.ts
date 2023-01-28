import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseBefore } from 'routing-controllers';
import NoteService from '@services/notes.service';
import { CreateNoteDto } from '@dtos/notes.dto';
import { validationMiddleware } from '@middlewares/validation.middleware';

@Controller('/notes')
export class NotesController {
  public noteService = new NoteService();
  @Get('/')
  async get_notes() {
    const notes = await this.noteService.findAllNote();
    return { data: notes, message: 'findAll' };
  }
  @Get('/:id')
  async get_note_by_id(@Param('id') noteId: number) {
    const note = await this.noteService.findNoteById(noteId);
    return { data: note, message: 'findOne' };
  }
  @Post('/')
  @HttpCode(201)
  @UseBefore(validationMiddleware(CreateNoteDto, 'body'))
  async create_note(@Body() noteData: CreateNoteDto) {
    const createdNoteData = await this.noteService.createNote(noteData);
    return { data: createdNoteData, message: 'created' };
  }
  @Put('/:id')
  @HttpCode(204)
  @UseBefore(validationMiddleware(CreateNoteDto, 'body'))
  async update_note(@Param('id') noteId: number, @Body() noteData: CreateNoteDto) {
    const updatedNoteData = await this.noteService.updateNote(noteId, noteData);
    return { data: updatedNoteData, message: 'updated' };
  }
  @Delete('/:id')
  @HttpCode(204)
  async delete_note(@Param('id') noteId: number) {
    const deleteNoteData = await this.noteService.deleteNote(noteId);
    return { data: deleteNoteData, message: 'deleted' };
  }

  @Get('/content/:expression')
  async get_note_by_content(@Param('expression') expression: string) {
    const noteData = await this.noteService.findNoteByContent(expression);
    return { data: noteData, message: 'findOneByContent' };
  }
}
