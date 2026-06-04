import express from 'express'
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createTask, deleteTask, getMyTasks, getSingleTask, updateTask } from '../controllers/taskController.js';

const router = express.Router();

router.post("/create", isLoggedIn, createTask);
router.get("/my-tasks", isLoggedIn, getMyTasks);
router.get("/my-task/:taskId", isLoggedIn, getSingleTask);
router.patch("/update/:taskId", isLoggedIn, updateTask);
router.delete("/delete/:taskId", isLoggedIn, deleteTask);

export default router;
