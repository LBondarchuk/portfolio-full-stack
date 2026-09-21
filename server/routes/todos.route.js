import express from "express";
import Todo from "../models/Todo.model.js";
import { getTodos } from "../controllers/getTodos.controller.js";
import { createTodos } from "../controllers/createTodo.controller.js";
import { deleteTodo } from "../controllers/deleteTodo.controller.js";

const router = express.Router();
router.get("/", getTodos);
router.post("/", createTodos);
router.delete("/:id", deleteTodo);

export default router;
