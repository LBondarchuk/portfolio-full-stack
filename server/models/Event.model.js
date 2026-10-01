import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  attendees: {
    type: Number,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    required: true,
  },
});

const Event = mongoose.model("Event", EventSchema);
export default Event;
