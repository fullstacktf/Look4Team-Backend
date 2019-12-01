import express, { json } from 'express';
import morgan from 'morgan';
import EventRoutes from './events/routes/eventsRoutes';
import GroupRoutes from './groups/routes/groupsRoutes';
import UserRoutes from './users/routes/userRoutes';

const server = express();

server.use(morgan('dev'));
server.use(json());

server.use('/events', EventRoutes);
server.use('/groups', GroupRoutes);
server.use('/users', UserRoutes);

server.listen(3000, () => {
  console.log('listening in port 3000');
});
