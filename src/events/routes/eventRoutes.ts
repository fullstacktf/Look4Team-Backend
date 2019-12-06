import { Router, Response, Request } from 'express';
import EventController from '../controller/eventController';
import { IEventModel } from '../model/eventModel';
const router: Router = Router();

//getAllEvents()
router.get('/', (req: Request, res: Response) => {
  EventController.getAllEvents()
    .then((events: IEventModel[]) => {
      res.status(200).json(events);
    })
    .catch((err: Error) => {
      throw new Error(`Error trying to get all events : ${err}`);
    });
});

//getEvent()
router.get('/:id', (req: Request, res: Response) => {
  EventController.getEvent(req.params.id)
    .then((event: IEventModel) => {
      res.status(200).json(event);
    })
    .catch((err: Error) => {
      throw new Error(`Error trying to get one event : ${err}`);
    });
});

//addEvent()
router.post('/', (req: Request, res: Response) => {
  EventController.addEvent(req.body)
    .then((event: IEventModel) => {
      return res.status(200).json(event);
    })
    .catch((err: Error) => {
      throw new Error(`Error trying to add event : ${err}`);
    });
});

//updateEvent()
router.put('/:id', (req: Request, res: Response) => {
  EventController.updateEvent(req.params.id, req.body)
    .then((event: IEventModel) => {
      return res.status(200).json(event);
    })
    .catch((err: Error) => {
      throw new Error(`Error trying to update event : ${err}`);
    });
});

//deleteEvent()
router.delete('/:id', (req: Request, res: Response) => {
  EventController.deleteEvent(req.params.id)
    .then((event: IEventModel) => {
      return res.status(200).json(event);
    })
    .catch((err: Error) => {
      throw new Error(`Error trying to delete event : ${err}`);
    });
});

router.get('/user/:username', (req: Request, res: Response) => {
  EventController.getUserEvents(req.params.username)
    .then((events: IEventModel[]) => {
      res.status(200).json(events);
    })
    .catch((err: Error) => {
      throw new Error(`Error trying to get user events : ${err}`);
    });
});

router.get('/last', (req: Request, res: Response) => {
  EventController.getLastEvents()
    .then((events: IEventModel[]) => {
      res.status(200).json(events);
    })
    .catch((err: Error) => {
      throw new Error(`Error trying to get last events : ${err}`);
    });
});

export default router;
