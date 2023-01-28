import App from '@/app';
import { IndexController } from '@controllers/index.controller';
import { UsersController } from '@controllers/users.controller';
import { NotesController } from '@controllers/notes.controller';

const app = new App([IndexController, UsersController, NotesController]);
app.listen();
