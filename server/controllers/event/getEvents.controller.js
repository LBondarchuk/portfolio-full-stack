import Event from "../../models/Event.model.js";

export const getEvents = async (req, res) => {
  try {
    const { date } = req.query;
   

const events = date
  ? await Event.find({
      date: {
        $regex: `^${date}`,
      },
    })
  : await Event.find();

    const changedEvents = events.map((event) => {
      const { __v, _id, description, attendees, ...rest } =
        event.toObject();

      return {
        id: _id.toString(),
        ...rest,
      };
    });

    res.status(200).json(changedEvents);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch events",
    });
  }
};