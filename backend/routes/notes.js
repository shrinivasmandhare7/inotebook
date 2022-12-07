const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//Route1:Get All the Notes using: GET "api/notes/fetchnotes"
//Login Required
router.get('/fetchallnotes', fetchuser,
    async (req, res) => {
        try {
            const notes = await Note.find({ user: req.user.id })
            res.json(notes)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error")
        }
    });


//Route2:Add a new Note using: POST "/api/notes/addnote".
//Login Required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a Valid title').isLength({ min: 5 }),
    body('description', 'Description Must be atleast 5 Characters').isLength({ min: 5 })
],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            //If there are errors, return Bad Request and the error message
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()
            res.json(savedNote)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error")
        }
    });

//Route3:Update a Note using: PUT "/api/notes/updatenote".
//Login Required
router.put('/updatenote/:id', fetchuser,
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            //create a new Note Object
            const newNote = {};
            if (title) { newNote.title = title };
            if (description) { newNote.description = description };
            if (tag) { newNote.tag = tag };

            //Find the note to be updated and update it
            let note = await Note.findById(req.params.id);
            if (!note) {
                return res.status(404).send("Not Found");
            }
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Authorized");
            }
            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
            res.json({ note })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error")
        }
    }
)
//Route4:Delete an existing Note using: DELETE "/api/notes/deletenote".
//Login Required
router.delete('/deletenote/:id', fetchuser,
    async (req, res) => {
        try {
            //Find the note to be deleted and delete it
            let note = await Note.findById(req.params.id);
            if (!note) {
                return res.status(404).send("Not Found");
            }
            //Allow deletion only if the user owns this Note
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Authorized");
            }
            note = await Note.findByIdAndDelete(req.params.id);
            res.json({ "Success": "Note has been Deleted", note: note })

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error")
        }

    }
)
module.exports = router;