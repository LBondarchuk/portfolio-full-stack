import Event from "../../models/Event.model.js";

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    await Event.findByIdAndDelete(id);
    res.status(204).json({ id });
  } catch (error) {
    console.error(error);
  }
};
