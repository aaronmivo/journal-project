const noteRouter = require("express").Router()
const Note = require("../models/noteModel")
const auth = require('../utils/auth')

noteRouter.post("/", auth,  async (req, res) => {
        const {title, content} = req.body

        if(!content && !title){
            return res.status(400).json({errorMessage: "Missing fields"})
        }
    
        const note = new Note({
            title: title,
            content: content,
            user: req.user
        })
    
        const savedNote = await note.save()
        res.json(savedNote)
})

noteRouter.get("/", auth, async (req, res) => {
    try {
        const notes = await Note.find({user: req.user});
        res.json(notes)
    } catch (err) {
        res.status(500).end()
    }
})

noteRouter.delete("/:id", auth, async(req, res) => {
    const currNote = await Note.findById(req.params.id);
    if(currNote.user.toString() !== req.user){
        return res.status(401).json({errorMessage: "Unauthorized access to note."})
    }

    await Note.findByIdAndDelete(req.params.id)
    res.status(204).end()
    
})

noteRouter.put("/:id", auth, async(req, res) => {
    const body = req.body

    const note ={
        title: body.title,
        content: body.content,
    }

    const originalNote = await Note.findById(req.params.id);
    if(originalNote.user.toString() !== req.user){
        return res.status(401).json({errorMessage: "Unauthorized access to note."})
    }

    Note.findByIdAndUpdate(req.params.id, note)
        .then(updatedNote => {
            res.json(updatedNote)
        })
        .catch(error => next(error))
})

module.exports = noteRouter