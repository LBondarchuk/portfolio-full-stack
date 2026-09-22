import Todo from "../models/Todo.model.js";

export const createTestTodos = async (req, res) => {
  try {
    // const categories = ["study", "work", "personal", "other"];
    // const statuses = ["todo", "in-progress", "done"];
    // const priorities = ["low", "medium", "high"];

    // const testTodos = Array.from({ length: 100 }, (_, index) => ({
    //   title: `Test Todo ${index + 1}`,
    //   description: `Test description ${index + 1}`,
    //   category: categories[index % categories.length],
    //   status: statuses[index % statuses.length],
    //   priority: priorities[index % priorities.length],
    //   isTest: true,
    // }));

    // await Todo.insertMany(testTodos);

    const limit = 5;
    const page = 1;

    const total = await Todo.countDocuments({ isTest: true });

    const totalPages = Math.ceil(total / limit);

    const todos = await Todo.find({ isTest: true }).limit(limit);

    res.status(201).json({
      todos: todos.map((todo) => {
        const { _id, ...rest } = todo._doc;

        return {
          id: _id.toString(),
          ...rest,
        };
      }),
      total,
      totalPages,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create test todos",
    });
  }
};
