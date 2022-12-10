import React, { useContext, useState } from 'react';
import noteContext from "../context/notes/NoteContext";

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "default" })

    const handleOnClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-3">
            <h1>Add a Note</h1>
            <form action="">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" placeholder="Add a title" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name='description' rows="3" onChange={onChange}></textarea>
                </div>
                <button className='btn btn-primary' type='submit' onClick={handleOnClick}>Add</button>
            </form >
        </div >
    )
}

export default AddNote