import express, { json } from 'express';
import morgan from 'morgan';
import compression from 'compression';
import config from './config/config';
import EventRoutes from './api/events/routes/eventRoutes';
import GroupRoutes from './api/groups/routes/groupRoutes';
import UserRoutes from './api/users/routes/userRoutes';
import { verifyJWT } from './middlewares/verifyJWT';

const server = express();

server.use(compression());
server.use(morgan('dev'));
server.use(json());

server.use(verifyJWT);

server.use('/events', EventRoutes);
server.use('/groups', GroupRoutes);
server.use('/users', UserRoutes);

server.set('port', config.port);
server.listen(server.get('port'), (error: Error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`listening in port ${server.get('port')}`);
  }
});
