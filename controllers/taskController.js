import TaskModal from "../modals/Task.js";
import UserModal from "../modals/User.js";

export const createTask = async (req, res) => {
    try {
        const { name, description, dueDate, priority, category, status } = req.body;

        const user = await UserModal.findOne({ email: req.user.email });

        const task = await TaskModal.create({
            name,
            description,
            dueDate,
            priority,
            category,
            status,
            createdBy: user._id
        })

        user.tasks.push(task._id);
        await user.save();

        return res.status(201).json({
            success: true,
            message: 'task created successfully',
            data: task
        })
    } catch (error) {
        console.log("Task Controller : Create Task::", error.message)
    }
}

export const getMyTasks = async (req, res) => {
    try {
        const tasks = await TaskModal.find({
            createdBy: req.user.id,
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            data: tasks,
        });
    } catch (error) {
        console.log("Task Controller : Get My Tasks ::", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await TaskModal.findOneAndUpdate(
            {
                _id: taskId,
                createdBy: req.user.id,
            },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task,
        });
    } catch (error) {
        console.log("Task Controller : Update Task ::", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await TaskModal.findOneAndDelete({
            _id: taskId,
            createdBy: req.user.id,
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        await UserModal.findByIdAndUpdate(req.user.id, {
            $pull: { tasks: taskId },
        });

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        console.log("Task Controller : Delete Task ::", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};