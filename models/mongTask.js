const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {type: String, require: true},
    description: String,
    isCompleted: Boolean,
})

const Task = mongoose.model('Task',taskSchema);

module.exports = Task;