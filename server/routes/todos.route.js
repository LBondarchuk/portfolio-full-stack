import express from "express";
import Todo from "../models/Todo.model.js";
import { getTodos } from "../controllers/todo/getTodos.controller.js";
import { createTodos } from "../controllers/todo/createTodo.controller.js";
import { deleteTodo } from "../controllers/todo/deleteTodo.controller.js";
import { updateTodo } from "../controllers/todo/updateTodo.controller.js";
import { createTestTodos } from "../controllers/todo/createTestTodos.controller.js";
import { getTodoAnalytics } from "../controllers/todo/getTodoAnalytics.controller.js";

const router = express.Router();
router.get("/", getTodos);
router.post("/", createTodos);
router.post("/createTestTodos", createTestTodos);
router.delete("/:id", deleteTodo);
router.patch("/:id", updateTodo);
router.get("/analytics", getTodoAnalytics);

export default router;
