//CRUD for EVENTS
import express from 'express';
import type { Request, Response } from 'express';
import { Event } from '../../models/event';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  //get events
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: (err as Error).message });
  }
});
router.get('/:id', async (req: Request, res: Response) => {
  //get events by id
  const { id } = req.params;
  try {
    const eventById = await Event.findByPk(id);
    if (eventById) {
      res.json(eventById);
    } else {
      res.status(404).json('Event not found.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: (err as Error).message });
  }
});
router.post('/', async (req: Request, res: Response) => {
  //create new event
  const { title, location, date, time, userId } = req.body;
  try {
    const newEvent = await Event.create({
      title,
      location,
      date,
      time,
      userId,
    });
    res.status(201).json(newEvent);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to create new event.' });
  }
});
router.put('/:id', async (req: Request, res: Response) => {
  //update an event (by id)
  const { id } = req.params;
  const { title, location, date } = req.body;
  try {
    const updateEvent = await Event.findByPk(id);
    if (updateEvent) {
      if (title) {
        updateEvent.title = title;
      }
      if (location) {
        updateEvent.location = location;
      }
      if (date) {
        updateEvent.date = date;
      }
      await updateEvent.save();
      res.json(updateEvent);
    } else {
      res.status(404).json('Event not found.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: (err as Error).message });
  }
});
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleteEvent = await Event.findByPk(id);
    if (deleteEvent) {
      await deleteEvent.destroy();
      res.json({ message: 'Event deleted.' });
    } else {
      res.status(404).json('Event not found.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: (err as Error).message });
  }
});

export { router as eventRouter };
