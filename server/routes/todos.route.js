import express from "express";
import Todo from "../models/Todo.model.js";
import { getTodos } from "../controllers/getTodos.controller.js";
import { createTodos } from "../controllers/createTodo.controller.js";
import { deleteTodo } from "../controllers/deleteTodo.controller.js";
import { updateTodo } from "../controllers/updateTodo.controller.js";
import { createTestTodos } from "../controllers/createTestTodos.controller.js";
import { getTodoAnalytics } from "../controllers/getTodoAnalytics.controller.js";

const router = express.Router();
router.get("/", getTodos);
router.post("/", createTodos);
router.post("/createTestTodos", createTestTodos);
router.delete("/:id", deleteTodo);
router.patch("/:id", updateTodo);
router.get("/analytics", getTodoAnalytics);

export default router;
