import Todo from "../models/Todo.model.js";

export const getTodos = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 5,
      search,
      category,
      status,
      priority,
      sort = "newest",
    } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (category ) {
      filter.category = category;
    }

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    const total = await Todo.countDocuments(filter);

    const totalPages = Math.ceil(total / Number(limit));

    const skip = (Number(page) - 1) * Number(limit);

    let sortOption = {};

    if (sort === "newest") {
      sortOption = { createdAt: -1 };
    }

    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    }

    const todos = await Todo.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      todos: todos.map((todo) => {
        const { _id, ...rest } = todo.toObject();

        return {
          id: _id.toString(),
          ...rest,
        };
      }),
      total,
      totalPages,
      currentPage: Number(page),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch todos",
    });
  }
};