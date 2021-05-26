import React from 'react'

import noteServices from '../services/notes'
import { Card, Button } from 'react-bootstrap'
import "./Note.css";

const Note = ({note, getNotes, editNote}) => {
    const deleteNote = () => {
         noteServices.deleteNote(note._id).then(() => {
             getNotes()
         }).catch(err => err)
    }
    return(
        <Card style={{margin: "0.5rem"}}>
            <Card.Header>{note.title}</Card.Header>
            <Card.Body>
            <Card.Text>{note.content}</Card.Text>
            <Button variant="danger" onClick={deleteNote} >Delete</Button>
            <Button style={{margin: "0.5rem"}}variant ="primary" onClick={() => editNote(note)}>Edit</Button>
            </Card.Body>
        </Card>
    )
}

export default Note