import React, {useState, useEffect} from "react"
import noteServices from "../services/notes"

import { Form, Button } from "react-bootstrap"
import "./NoteInput.css";


const NoteInput = ({notes, setNotes, getNotes, editNoteData, setEditNoteData}) => {
    const [newNoteTitle, setNewNoteTitle] = useState("")
    const [newNoteContent, setNewNoteContent] = useState("")


    useEffect(() => {
        if(editNoteData){
            setNewNoteTitle(editNoteData.title ? editNoteData.title : "")
            setNewNoteContent(editNoteData.content ? editNoteData.content : "")
        }
    }, [editNoteData])

    const addNote = (e) => {
        e.preventDefault()

        const noteObject = {
            title: newNoteTitle ? newNoteTitle : undefined,
            content: newNoteContent  ? newNoteContent : undefined,
        }

        if(!editNoteData){
            noteServices.createNote(noteObject).then(() => {
                getNotes()
                setNewNoteContent("")
                setNewNoteTitle("")
            }).catch(err => err)
        } else{
            noteServices.updateNote(editNoteData._id, noteObject).then(() => {
                getNotes()
                setNewNoteContent("")
                setNewNoteTitle("")
                setEditNoteData(null)
            }).catch(err => console.log(err))
        }
        getNotes()


    }
    
    return(
    <Form onSubmit={addNote} className="form">
        <Form.Group controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value = {newNoteTitle} onChange={(e) => setNewNoteTitle(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="formBasicNote">
            <Form.Label>Note</Form.Label>
            <Form.Control type="text" value = {newNoteContent} onChange={(e) => setNewNoteContent(e.target.value)}/>
        </Form.Group>
        <Button variant = "primary" type="submit">Submit</Button>
    </Form>
    )
}

export default NoteInput;