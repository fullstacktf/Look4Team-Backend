import { Router, Response, Request } from 'express';
import AuthController from '../controller/authController';
const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).send('Api Look 4 Team');
});

router.post('/login', (req: Request, res: Response) => {
  AuthController.login(req.body)
    .then((token: string) => {
      res.send(token);
      res.status(200).send();
    })
    .catch((err: Error) => {
      res.status(401).send();
      throw new Error(`Log in Error : ${err}`);
    });
});

router.post('/signup', (req: Request, res: Response) => {
  AuthController.signUp(req.body)
    .then((token: string) => {
      res.send(token);
      res.status(200).send();
    })
    .catch((err: Error) => {
      res.status(401).send();
      throw new Error(`Sign up Error : ${err}`);
    });
});

export default router;
