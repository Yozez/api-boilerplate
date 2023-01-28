import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import noteModel from '@models/notes.model';
import { Note } from '@interfaces/notes.interface';
import { CreateNoteDto } from '@dtos/notes.dto';

class NoteService {
  public notes = noteModel;

  public async findAllNote(): Promise<Note[]> {
    const notes: Note[] = this.notes;
    return notes;
  }

  public async findNoteById(noteId: number): Promise<Note> {
    const findNote: Note = this.notes.find(note => note.id === noteId);
    if (!findNote) throw new HttpException(409, "Note doesn't exist");

    return findNote;
  }

  public async createNote(noteData: CreateNoteDto): Promise<Note> {
    if (isEmpty(noteData)) throw new HttpException(400, 'noteData is empty');

    const findUser: Note = this.notes.find(user => user.title === noteData.title);
    if (findUser) throw new HttpException(409, `This note ${noteData.title} already exists`);

    const createNoteDto: Note = { id: this.notes.length + 1, ...noteData };
    this.notes = [...this.notes, createNoteDto];

    return createNoteDto;
  }

  public async updateNote(noteId: number, noteData: CreateNoteDto): Promise<Note[]> {
    if (isEmpty(noteData)) throw new HttpException(400, 'noteData is empty');

    const findNote: Note = this.notes.find(note => note.id === noteId);
    if (!findNote) throw new HttpException(409, "Note doesn't exist");

    const updateUserData: Note[] = this.notes.map((user: Note) => {
      if (user.id === findNote.id) user = { id: noteId, ...noteData };
      return user;
    });

    this.notes = updateUserData;

    return updateUserData;
  }

  public async deleteNote(noteId: number): Promise<Note[]> {
    const findNote: Note = this.notes.find(note => note.id === noteId);
    if (!findNote) throw new HttpException(409, "Note doesn't exist");

    const deleteUserData: Note[] = this.notes.filter(note => note.id !== findNote.id);
    this.notes = deleteUserData;
    return deleteUserData;
  }

  public async findNoteByContent(content: string): Promise<Note> {
    const findNote: Note = this.notes.find(note => RegExp(content).test(note.content));
    if (!findNote) throw new HttpException(409, "Note doesn't exist");
    return findNote;
  }
}

export default NoteService;
