import App from '@/app';
import { IndexController } from '@controllers/index.controller';
import { UsersController } from '@controllers/users.controller';


const app = new App([IndexController, UsersController]);
app.listen();
