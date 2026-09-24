import Todo from "../models/Todo.model.js";

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    const updateData = { ...data };

    if (data.status === "done" && todo.status !== "done") {
      updateData.completedAt = new Date();
    }

    if (
      data.status &&
      data.status !== "done" &&
      todo.status === "done"
    ) {
      updateData.completedAt = null;
    }

    Object.assign(todo, updateData);

    const updatedTodo = await todo.save();

    const { _id, ...rest } = updatedTodo.toObject();

    res.status(200).json({
      id: _id.toString(),
      ...rest,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update todo",
    });
  }
};