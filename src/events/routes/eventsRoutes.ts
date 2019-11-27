import { Router, Response, Request } from 'express';
import EventController from '../controller/eventsController';
import { IEventModel } from '../model/eventsModel';
const router: Router = Router();

//getAllEvents()
router.get('/', (req: Request, res: Response) => {
    EventController.getAllEvents()
        .then((events: IEventModel[]) => {
            res.send(200).json(events);
        })
        .catch((err: Error) => {
            throw new Error(`Error trying to get all events : ${err}`);
        });
});

//getEvent()
router.get('/:id', (req: Request, res: Response) => {
    EventController.getEvent(req.params.id)
      .then((user: IEventModel) => {
        res.status(200).json(event);
      })
      .catch((err: Error) => {
        throw new Error(`Error trying to get one event : ${err}`);
      });
  });

//addEvent()
//duda con el controlador
// router.post('/', (req: Request, res: Response) => {
//     EventController.addEvent(req.body)
//       .then((user: IEventModel) => {
//         return res.status(200).json(event);
//       })
//       .catch((err: Error) => {
//         throw new Error(`Error trying to add event : ${err}`);
//       });
//   });
  
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

//searchEventsBy()


export default router;
