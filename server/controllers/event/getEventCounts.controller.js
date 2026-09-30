import Event from "../../models/Event.model.js";

export const getEventCounts = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({
        message: "Month is required",
      });
    }

    const events = await Event.aggregate([
      {
        $match: {
          date: {
            $regex: `^${month}`,
          },
        },
      },
      {
        $group: {
          _id: {
            $substr: ["$date", 0, 10],
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const counts = events.reduce((acc, event) => {
      acc[event._id] = event.count;
      return acc;
    }, {});

    res.status(200).json(counts);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch event counts",
    });
  }
};