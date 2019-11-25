import express, { json } from 'express';
import morgan from 'morgan';
import UserRoutes from './users/routes/userRoutes';

const server = express();

server.use(morgan('dev'));
server.use(json());
server.use('/users', UserRoutes);

server.listen(3000, () => {
  console.log('listening in port 3000');
});
