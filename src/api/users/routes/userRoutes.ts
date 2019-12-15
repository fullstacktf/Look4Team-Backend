import { Router, Response, Request, NextFunction } from 'express';
import UserController from '../controller/userController';
import { IUserModel } from '../model/userModel';
import HttpException from '../../../utils/HttpException';
const router: Router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  UserController.getAllUsers()
    .then((users: IUserModel[]) => {
      res.status(200).json(users);
    })
    .catch((error: HttpException) => {
      next(error);
    });
});

router.get('/:username', (req: Request, res: Response, next: NextFunction) => {
  UserController.getUser(req.params.username)
    .then((user: IUserModel) => {
      res.status(200).json(user);
    })
    .catch((error: HttpException) => {
      next(error);
    });
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  UserController.addUser(req.body)
    .then((user: IUserModel) => {
      return res.status(200).json(user);
    })
    .catch((error: HttpException) => {
      next(error);
    });
});

router.put('/:username', (req: Request, res: Response, next: NextFunction) => {
  UserController.updateUser(req.params.username, req.body)
    .then((user: IUserModel) => {
      return res.status(200).json(user);
    })
    .catch((error: HttpException) => {
      next(error);
    });
});

router.delete('/:username', (req: Request, res: Response, next: NextFunction) => {
  UserController.deleteUser(req.params.username)
    .then((user: IUserModel) => {
      return res.status(200).json(user);
    })
    .catch((error: HttpException) => {
      next(error);
    });
});

export default router;
