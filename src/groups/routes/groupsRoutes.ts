import { Router, Response, Request } from 'express';
import GroupController from '../controller/groupsController';
import { IGroupModel } from '../model/groupsModel';
const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    GroupController.getAllGroups()
    .then((groups: IGroupModel[]) => {
      res.status(200).json(groups);
    })
    .catch((err: Error) => {
      throw new Error(`Error trying to get all groups : ${err}`);
    });
});

router.get('/:id', (req: Request, res: Response) => {
    GroupController.getGroup(req.params.id)
    .then((group: IGroupModel) => {
      res.status(200).json(group);
    })
    .catch((err: Error) => {
      throw new Error(`Error trying to get one group : ${err}`);
    });
});

router.post('/', (req: Request, res: Response) => {
    GroupController.addGroup(req.body)
    .then((group: IGroupModel) => {
      return res.status(200).json(group);
    })
    .catch((err: Error) => {
      throw new Error(`Error trying to add group : ${err}`);
    });
});

router.put('/:id', (req: Request, res: Response) => {
    GroupController.updateGroup(req.params.id, req.body)
    .then((group: IGroupModel) => {
      return res.status(200).json(group);
    })
    .catch((err: Error) => {
      throw new Error(`Error trying to update group : ${err}`);
    });
});

router.delete('/:id', (req: Request, res: Response) => {
    GroupController.deleteGroup(req.params.id)
    .then((group: IGroupModel) => {
      return res.status(200).json(group);
    })
    .catch((err: Error) => {
      throw new Error(`Error trying to delete group : ${err}`);
    });
});

export default router;
