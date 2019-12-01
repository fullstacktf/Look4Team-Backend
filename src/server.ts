import express, { json } from 'express';
import morgan from 'morgan';
import UserRoutes from './users/routes/userRoutes';
import GroupRoutes from './groups/routes/groupsRoutes';

const bodyParser = require('body-parser')
const server = express();

server.use(morgan('dev'));
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use('/users', UserRoutes);
server.use('/groups', GroupRoutes);

server.listen(3000, () => {
  console.log('listening in port 3000');
});