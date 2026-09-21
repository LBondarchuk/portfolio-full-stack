import Todo from "../models/Todo.model.js";

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    await Todo.findByIdAndDelete(id);

    res.status(204).json("Todo ist deleted");
  } catch (error) {
    console.error(error);

    res.status(500).json("Failed to delete todo");
  }
};
