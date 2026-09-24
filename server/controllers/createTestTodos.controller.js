import Todo from "../models/Todo.model.js";

export const createTestTodos = async (req, res) => {
  console.log('dd')
  try {
    const categories = ["study", "work", "personal", "other"];
    const statuses = ["todo", "in-progress", "done"];
    const priorities = ["low", "medium", "high"];

    const testTodos = Array.from({ length: 100 }, (_, index) => {
      const status = statuses[index % statuses.length];

      return {
        title: `Test Todo ${index + 1}`,
        description: `Test description ${index + 1}`,
        category: categories[index % categories.length],
        status,
        priority: priorities[index % priorities.length],
        completedAt: status === "done" ? new Date() : null,
        isTest: true,
      };
    });

    await Todo.insertMany(testTodos);

    const limit = 5;
    const page = 1;

    const total = await Todo.countDocuments({
      isTest: true,
    });

    const totalPages = Math.ceil(total / limit);

    const todos = await Todo.find({
      isTest: true,
    }).limit(limit);

    res.status(201).json({
      todos: todos.map((todo) => {
        const { _id, ...rest } = todo.toObject();

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