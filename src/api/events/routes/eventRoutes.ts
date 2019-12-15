import { Router, Response, Request, NextFunction } from 'express';
import EventController from '../controller/eventController';
import { IEventModel } from '../model/eventModel';
import HttpException from '../../../utils/HttpException';
const router: Router = Router();

//getAllEvents()
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  EventController.getAllEvents()
    .then((events: IEventModel[]) => {
      res.status(200).json(events);
    })
    .catch((error: HttpException) => {
      next(error);
    });
});

//getEvent()
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  EventController.getEvent(req.params.id)
    .then((event: IEventModel) => {
      res.status(200).json(event);
    })
    .catch((error: HttpException) => {
      next(error);
    });
});

//addEvent()
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  EventController.addEvent(req.body)
    .then((event: IEventModel) => {
      return res.status(200).json(event);
    })
    .catch((error: HttpException) => {
      next(error);
    });
});

//updateEvent()
router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  EventController.updateEvent(req.params.id, req.body)
    .then((event: IEventModel) => {
      return res.status(200).json(event);
    })
    .catch((error: HttpException) => {
      next(error);
    });
});

//deleteEvent()
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  EventController.deleteEvent(req.params.id)
    .then((event: IEventModel) => {
      return res.status(200).json(event);
    })
    .catch((error: HttpException) => {
      next(error);
    });
});

router.get('/events/:username', (req: Request, res: Response, next: NextFunction) => {
  EventController.getUserEvents(req.params.username)
    .then((events: IEventModel[]) => {
      res.status(200).json(events);
    })
    .catch((error: HttpException) => {
      next(error);
    });
});

router.get('/last', (req: Request, res: Response, next: NextFunction) => {
  EventController.getLastEvents()
    .then((events: IEventModel[]) => {
      res.status(200).json(events);
    })
    .catch((error: HttpException) => {
      next(error);
    });
});

export default router;
