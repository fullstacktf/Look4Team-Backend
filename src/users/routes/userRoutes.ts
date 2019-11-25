import { Router, Response, Request } from 'express';
import UserController from '../controller/userController';
const router:Router = Router();

router.get('/', (req:Request, res:Response) => {
  UserController.getAllUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err:Error) => {
      throw new Error(`Error trying to get all users : ${err}`);
    });
});

router.get('/:id', (req:Request, res:Response) => {
  UserController.getUser(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err:Error) => {
      throw new Error(`Error trying to get one user : ${err}`);
    });  
});

router.post('/', (req:Request, res:Response) => {
  UserController.addUser(req.body)
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err:Error) => {
      throw new Error(`Error trying to add user : ${err}`);
    });  
});

router.put('/:id', (req:Request, res:Response) => {
  UserController.updateUser(req.params.id, req.body)
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err:Error) => {
      throw new Error(`Error trying to update user : ${err}`);
    }); 
});

router.delete('/:id', (req:Request, res:Response) => {
  UserController.deleteUser(req.params.id)
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err:Error) => {
      throw new Error(`Error trying to delete user : ${err}`);
    });  
});

export default router;