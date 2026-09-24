import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  category: {
    type: String,
    enum: ["study", "work", "personal", "other"],
    required: true,
  },

  status: {
    type: String,
    enum: ["todo", "in-progress", "done"],
    required: true,
  },

  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    required: true,
  },

  dueDate: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
    default: null,
  },
    isTest: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;