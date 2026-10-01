import Event from "../../models/Event.model.js";

export const getEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);

    const { __v, _id, ...rest } = event.toObject();

    res.status(200).json({ id: _id, ...rest });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to load event:" + id || "",
    });
  }
};
