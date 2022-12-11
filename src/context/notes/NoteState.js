import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    //Get all notes
    const getNotes = async () => {
        //API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5NDcwYjFhNDhiMzk5MDI0Mzk0ZDJhIn0sImlhdCI6MTY3MDY3MjU2MX0.AY0utXLxN2-l0SKTo5NiV9n2JZoAncVpH-KG5fj-ky0"
                }
            });
        const json = await response.json();
        console.log(json)
        setNotes(json)
    }

    //Add a note
    const addNote = async (title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/addnote`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5NDcwYjFhNDhiMzk5MDI0Mzk0ZDJhIn0sImlhdCI6MTY3MDY3MjU2MX0.AY0utXLxN2-l0SKTo5NiV9n2JZoAncVpH-KG5fj-ky0"
                },
                body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
            });

        const note = await response.json();
        setNotes(notes.concat(note))
    }
    //Delete a note
    const deleteNote = async (id) => {
        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5NDcwYjFhNDhiMzk5MDI0Mzk0ZDJhIn0sImlhdCI6MTY3MDY3MjU2MX0.AY0utXLxN2-l0SKTo5NiV9n2JZoAncVpH-KG5fj-ky0"
                }
            });
        const json = response.json();
        console.log(json)
        console.log("deleting a note: " + id);
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5NDcwYjFhNDhiMzk5MDI0Mzk0ZDJhIn0sImlhdCI6MTY3MDY3MjU2MX0.AY0utXLxN2-l0SKTo5NiV9n2JZoAncVpH-KG5fj-ky0"
                },
                body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
            });
        const json = await response.json();
        console.log(json)
        let newNotes = JSON.parse(JSON.stringify(notes));
        //Logic to edit a note
        for (let i = 0; i < newNotes.length; i++) {
            const element = newNotes[i];
            if (element._id === id) {
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;