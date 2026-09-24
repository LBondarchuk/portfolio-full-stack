import Todo from "../models/Todo.model.js";

export const createTodos = async (req, res) => {
  try {
    const data = {
      ...req.body,
      completedAt: req.body.status === "done"
        ? new Date()
        : null,
    };

   

    const todo = await Todo.create(data);
    console.log(todo)

    const { _id, ...rest } = todo.toObject();

    res.status(201).json({
      id: _id.toString(),
      ...rest,
    });
  } catch (error) {
    console.error(error, "error");

    res.status(500).json({
      message: "Failed to create todo",
    });
  }
};