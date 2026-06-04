import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName : String,
    email:String,
    password : String,
    tasks : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Task'
        }
    ]
}, {
    timestamps: true
})

const UserModal = mongoose.model('User', UserSchema);
export default UserModal;