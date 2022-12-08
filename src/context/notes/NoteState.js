import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "63902c69650e61f5dae3c897",
            "user": "638f542f73256bd91b6b7359",
            "title": "Test Title",
            "description": "Testing",
            "tag": "test",
            "date": "2022-12-07T06:02:17.351Z",
            "__v": 0
        },
        {
            "_id": "639045b350e61f5dae3c89d",
            "user": "638f542f73256bd91b6b7359",
            "title": "Test Title",
            "description": "Testing",
            "tag": "test",
            "date": "2022-12-07T07:50:11.943Z",
            "__v": 0
        }, {
            "_id": "639045b365e61f5dae3c89d",
            "user": "638f542f73256bd91b6b7359",
            "title": "Test Title",
            "description": "Testing",
            "tag": "test",
            "date": "2022-12-07T07:50:11.943Z",
            "__v": 0
        }, {
            "_id": "639045b3650e615dae3c89d",
            "user": "638f542f73256bd91b6b7359",
            "title": "Test Title",
            "description": "Testing",
            "tag": "test",
            "date": "2022-12-07T07:50:11.943Z",
            "__v": 0
        }, {
            "_id": "639045b3650e61f5da3c89d",
            "user": "638f542f73256bd91b6b7359",
            "title": "Test Title",
            "description": "Testing",
            "tag": "test",
            "date": "2022-12-07T07:50:11.943Z",
            "__v": 0
        }
    ]
    const [notes, setnotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{ notes, setnotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;