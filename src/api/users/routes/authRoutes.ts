import { Router, Response, Request, NextFunction } from 'express';
import AuthController from '../controller/authController';
import HttpException from '../../../utils/HttpException';
const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).send('Look 4 Team - Api');
});

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  AuthController.login(req.body)
    .then((token: string) => {
      res.status(200).json({ token: token });
    })
    .catch((error: HttpException) => {
      next(error);
    });
});

router.post('/signup', (req: Request, res: Response, next: NextFunction) => {
  AuthController.signUp(req.body)
    .then((token: string) => {
      res.status(200).json({ token: token });
    })
    .catch((error: HttpException) => {
      next(error);
    });
});

export default router;
