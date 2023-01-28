import request from 'supertest';
import App from '@/app';
import { NotesController } from '@controllers/notes.controller';
import { CreateNoteDto } from '@dtos/notes.dto';
import { Note } from '@interfaces/notes.interface';
import noteModel from '@models/notes.model';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Users', () => {
  describe('[GET] /notes', () => {
    it('response statusCode 200 / findAll', () => {
      const findNote: Note[] = noteModel;

      const app = new App([NotesController]);
      return request(app.getServer()).get('/notes').expect(200, { data: findNote, message: 'findAll' });
    });
  });

  describe('[GET] /notes/:id', () => {
    it('response statusCode 200 / findOne', () => {
      const noteId = 1;
      const findNote: Note = noteModel.find(user => user.id === noteId);

      const app = new App([NotesController]);
      return request(app.getServer()).get(`/notes/${noteId}`).expect(200, { data: findNote, message: 'findOne' });
    });
  });

  describe('[POST] /notes', () => {
    it('response statusCode 201 / created', async () => {
      const userData: CreateNoteDto = {
        title: 'title 1',
        content: 'content 1',
      };

      const app = new App([NotesController]);
      return request(app.getServer()).post('/notes').send(userData).expect(201);
    });
  });

  describe('[PUT] /notes/:id', () => {
    it('response statusCode 200 / updated', async () => {
      const noteId = 1;
      const userData: CreateNoteDto = {
        title: 'title 1',
        content: 'content 1',
      };

      const app = new App([NotesController]);
      return request(app.getServer()).put(`/notes/${noteId}`).send(userData).expect(204);
    });
  });

  describe('[DELETE] /notes/:id', () => {
    it('response statusCode 200 / deleted', () => {
      const noteId = 1;

      const app = new App([NotesController]);
      return request(app.getServer()).delete(`/notes/${noteId}`).expect(204);
    });
  });

  describe('[GET] /notes/content/:expression', () => {
    it('response statusCode 200 / findOneByContent', () => {
      const expression = '.*content.*';

      const app = new App([NotesController]);
      return request(app.getServer()).get(`/notes/content/${expression}`).expect(200);
    });
  });
});
