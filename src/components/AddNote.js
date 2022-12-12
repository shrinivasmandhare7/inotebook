import React, { useContext, useState } from 'react';
import noteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleOnClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        props.showAlert("Added the Note Succesfully", "success")
        setNote({ title: "", description: "", tag: "" })
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
                    <input type="text" className="form-control" id="title" name="title" value={note.title} minLength={5} required placeholder="Add a title" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name='description' value={note.description} minLength={5} required rows="3" onChange={onChange}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} minLength={5} required placeholder="Add a tag" onChange={onChange} />
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} className='btn btn-primary' type='submit' onClick={handleOnClick}>Add Note</button>
            </form >
        </div >
    )
}

export default AddNote