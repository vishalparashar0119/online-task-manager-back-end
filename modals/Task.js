import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    name: String,
    description: String,
    dueDate: Date,
    priority: {
        type: String,
        enum: ["high", "medium", "low"],
    },
    category: {
        type: String,
        enum: ["work", "personal", "study", "health"],
    },
    status: {
        type: String,
        enum: ['incomplete', 'completed'],
        default: 'incomplete'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
} , {
    timestamps: true
})

const TaskModal = mongoose.model('Task', TaskSchema);
export default TaskModal;