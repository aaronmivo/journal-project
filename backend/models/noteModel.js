const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const Note = mongoose.model("Note", noteSchema)

module.exports = Note;