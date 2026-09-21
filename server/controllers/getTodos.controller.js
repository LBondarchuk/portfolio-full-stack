import Todo from "../models/Todo.model.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();

    res.status(200).json(todos.map(({_id, _doc}) => ({id:_id, ..._doc})));
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch todos",
    });
  }
}