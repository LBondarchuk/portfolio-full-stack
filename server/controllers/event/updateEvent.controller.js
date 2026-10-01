import Event from "../../models/Event.model.js";

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const mongoEvent = await Event.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!mongoEvent) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const { __v, _id, ...event } = mongoEvent.toObject();

    res.status(200).json({
      id: _id.toString(),
      ...event,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update event",
    });
  }
};