import express from "express";
import { createEvent } from "../controllers/event/createEvent.controller.js";
import { getEvents } from "../controllers/event/getEvents.controller.js";
import { getEventCounts } from "../controllers/event/getEventCounts.controller.js";
import { getEvent } from "../controllers/event/getEvent.controller.js";
import { deleteEvent } from "../controllers/event/deleteEvent.controller.js";
import { updateEvent } from "../controllers/event/updateEvent.controller.js";
import { getDayCount } from "../controllers/event/getDayCount.controller.js";

const router = express.Router();

router.get("/month", getEventCounts);
router.get('/day-count', getDayCount)
router.get("/", getEvents);
router.get("/:id", getEvent);
router.delete("/:id", deleteEvent);
router.patch("/:id", updateEvent);
router.post("/", createEvent);

export default router;
