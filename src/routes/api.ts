import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";
import {
  validateRegister,
  validateLogin,
  validateTodo,
} from "../middlewares/validator.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/auth/register", validateRegister, register);
router.post("/auth/login", validateLogin, login);

router.get("/todos", verifyToken, getTodos);
router.post("/todos", verifyToken, validateTodo, createTodo);
router.put("/todos/:id", verifyToken, updateTodo);
router.delete("/todos/:id", verifyToken, deleteTodo);

export default router;
