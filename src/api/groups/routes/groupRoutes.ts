import { Router, Response, Request, NextFunction } from 'express';
import GroupController from '../controller/groupController';
import { IGroupModel } from '../model/groupModel';
import HttpException from '../../../utils/HttpException';
const router: Router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  GroupController.getAllGroups()
    .then((groups: IGroupModel[]) => {
      res.status(200).json(groups);
    })
    .catch((error: HttpException) => {
      next(error);
    });
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  GroupController.getGroup(req.params.id)
    .then((group: IGroupModel) => {
      res.status(200).json(group);
    })
    .catch((error: HttpException) => {
      next(error);
    });
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  GroupController.addGroup(req.body)
    .then((group: IGroupModel) => {
      return res.status(200).json(group);
    })
    .catch((error: HttpException) => {
      next(error);
    });
});

router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  GroupController.updateGroup(req.params.id, req.body)
    .then((group: IGroupModel) => {
      return res.status(200).json(group);
    })
    .catch((error: HttpException) => {
      next(error);
    });
});

router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  GroupController.deleteGroup(req.params.id)
    .then((group: IGroupModel) => {
      return res.status(200).json(group);
    })
    .catch((error: HttpException) => {
      next(error);
    });
});

router.get('/groups/:username', (req: Request, res: Response, next: NextFunction) => {
  GroupController.getUserGroups(req.params.username)
    .then((groups: IGroupModel[]) => {
      res.status(200).json(groups);
    })
    .catch((error: HttpException) => {
      next(error);
    });
});

router.get('/last', (req: Request, res: Response, next: NextFunction) => {
  GroupController.getLastGroups()
    .then((groups: IGroupModel[]) => {
      res.status(200).json(groups);
    })
    .catch((error: HttpException) => {
      next(error);
    });
});

export default router;
