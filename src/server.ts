import express, { json } from 'express';
import morgan from 'morgan';
import compression from 'compression';
import EventRoutes from './api/events/routes/eventRoutes';
import GroupRoutes from './api/groups/routes/groupRoutes';
import UserRoutes from './api/users/routes/userRoutes';

const server = express();

server.use(compression());
server.use(morgan('dev'));
server.use(json());

server.use('/events', EventRoutes);
server.use('/groups', GroupRoutes);
server.use('/users', UserRoutes);

server.listen(3000, () => {
  console.log('listening in port 3000');
});
