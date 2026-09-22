import Todo from "../models/Todo.model.js";

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

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