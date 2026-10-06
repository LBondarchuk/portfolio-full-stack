
import Todo from "../../models/Todo.model.js";

const getLastSevenDays = () => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Berlin",
    weekday: "short",
  });

  const today = new Date();

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));

    const year = new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Berlin",
      year: "numeric",
    }).format(date);

    const month = new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Berlin",
      month: "2-digit",
    }).format(date);

    const day = new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Berlin",
      day: "2-digit",
    }).format(date);

    return {
      key: `${year}-${month}-${day}`,
      day: formatter.format(date),
    };
  });
};

export const getTodoActivity = async (req, res) => {
  try {
    const weeklyData = await Todo.aggregate([
      {
        $match: {
          status: "done",
          completedAt: {
            $ne: null,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$completedAt",
              timezone: "Europe/Berlin",
            },
          },
          completed: {
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

    const lastSevenDays = getLastSevenDays();

    const result = lastSevenDays.map((day) => {
      const found = weeklyData.find(
        (item) => item._id === day.key
      );

      return {
        day: day.day,
        completed: found?.completed ?? 0,
      };
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Failed to get todo activity:", error);

    res.status(500).json({
      message: "Failed to get todo activity",
    });
  }
};

