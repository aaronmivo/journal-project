import React, {useState, useEffect, useContext} from "react";

import noteServices from "../services/notes"

import Note from "./Note";
import NoteInput from "./NoteInput"
import UserContext from "../context/UserContext";

import {Alert} from 'react-bootstrap'

const LoggedOut = () => {
    return (
        <Alert style={{margin: "2rem"}}variant={'warning'}>
            Must be logged in to add a note.
        </Alert>
    )
}



const Homepage = () => {
    const [notes, setNotes] = useState([])
    const [editNoteData, setEditNoteData] = useState(null)

    const { user } = useContext(UserContext);

    useEffect(() => {
        if(!user){
           setNotes([])
        } else {
            getNotes();
        }
        //eslint-disable-next-line
    }, [user]);

    //change to if a user is logged in, then make request
    const getNotes = () => {
        if(user === null){
            setNotes([])
        } else {
            noteServices.getNotes().then(res => {
                setNotes(res.data)
            })
        }
    }

    const editNote = (noteData) => {
        setEditNoteData(noteData)
    }

    const showNotes = () => {
        return notes.map(note => {
            return (<Note 
                    note={note} 
                    key={note._id} 
                    getNotes={getNotes} 
                    editNote={editNote}
                    />
            )
        })
    }



    return (
        <div className="home">
            {user ? <NoteInput notes={notes} setNotes={setNotes} getNotes={getNotes} showNotes={showNotes}editNoteData={editNoteData} setEditNoteData={setEditNoteData} /> : <LoggedOut/>}
            {showNotes()}

        </div>)
}

export default Homepage;