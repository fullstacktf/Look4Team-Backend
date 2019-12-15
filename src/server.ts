import express, { json } from 'express';
import morgan from 'morgan';
import compression from 'compression';
import config from './config/config';
import EventRoutes from './api/events/routes/eventRoutes';
import GroupRoutes from './api/groups/routes/groupRoutes';
import UserRoutes from './api/users/routes/userRoutes';
import AuthRoutes from './api/users/routes/authRoutes';
import { errorsHandler } from './middlewares/errorsHandler';
import { verifyJWT } from './middlewares/verifyJWT';
import cors from 'cors';

const server = express();

const corsOptions = {
  origin: ['https://look4.team', 'http://localhost:3000']
};

server.use(compression());
server.use(morgan('dev'));
server.use(json());
server.use(cors(corsOptions));

server.use('/api', AuthRoutes);
server.use('/api/events', EventRoutes);
server.use('/api/groups', verifyJWT, GroupRoutes);
server.use('/api/users', verifyJWT, UserRoutes);

server.use(errorsHandler);

server.set('port', config.port);
server.listen(server.get('port'), (error: Error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`listening in port ${server.get('port')}`);
  }
});
