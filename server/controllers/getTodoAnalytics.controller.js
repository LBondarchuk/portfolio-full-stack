import Todo from "../models/Todo.model.js";

const groupByField = (field) => {
  return Todo.aggregate([
    {
      $group: {
        _id: `$${field}`,
        value: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        value: 1,
      },
    },
    {
      $sort: {
        value: -1,
      },
    },
  ]);
};

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

export const getTodoAnalytics = async (req, res) => {
  try {
    const [status, priorities, categories, weeklyData] =
      await Promise.all([
        groupByField("status"),
        groupByField("priority"),
        groupByField("category"),

        Todo.aggregate([
          {
            $match: {
              status: "done",
              completedAt: {
                $ne: null,
                $gte: new Date(
                  Date.now() - 6 * 24 * 60 * 60 * 1000
                ),
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
              value: {
                $sum: 1,
              },
            },
          },
          {
            $sort: {
              _id: 1,
            },
          },
        ]),
      ]);

    const total = status.reduce(
      (sum, item) => sum + item.value,
      0
    );

    const completed =
      status.find((item) => item.name === "done")?.value ?? 0;

    const inProgress =
      status.find((item) => item.name === "in-progress")?.value ?? 0;

    const highPriority =
      priorities.find((item) => item.name === "high")?.value ?? 0;

    const completionRate =
      total > 0
        ? Math.round((completed / total) * 100)
        : 0;

    const lastSevenDays = getLastSevenDays();

    const weeklyCompletion = lastSevenDays.map((day) => {
      const found = weeklyData.find(
        (item) => item._id === day.key
      );

      return {
        day: day.day,
        value: found?.value ?? 0,
      };
    });

    res.status(200).json({
      summary: {
        total,
        completed,
        inProgress,
        highPriority,
        completionRate,
      },

      
        status,
        categories,
        priorities,
        weeklyCompletion,
      
    });
  } catch (error) {
    console.error("Failed to get todo analytics:", error);

    res.status(500).json({
      message: "Failed to get todo analytics",
    });
  }
};