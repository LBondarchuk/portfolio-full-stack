import Event from "../../models/Event.model.js";

export const getDayCount = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const count = await Event.countDocuments({
      date: {
        $gte: startOfDay.toISOString(),
        $lte: endOfDay.toISOString(),
      },
    });

    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to count today's events",
    });
  }
};