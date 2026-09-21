import Todo from "../models/Todo.model.js";

export const createTodos = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    const { _id, ...rest } = todo._doc;

    res.status(201).json({ id: _id, ...rest });
  } catch (error) {
    console.error(error, "error");
    res.status(500).json({ message: "Failed to create todo" });
  }
};
