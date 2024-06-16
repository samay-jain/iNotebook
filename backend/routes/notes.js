const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Notes');
const { body, validationResult } = require("express-validator");

//ROUTE 1: Get all the notes using: GET "/api/auth/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async(req,res)=>{
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})



//ROUTE 2: Add a new note using: POST "/api/auth/addnote". login required
router.post('/addnote', fetchuser, [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be of atleast 5 characters").isLength({
      min: 5,
    }),
  ], async(req,res)=>{

    try {
        const {title, description, tag} = req.body;

        //If there are errors return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        //Creating a new note
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();

        res.json(savedNote);
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})





//ROUTE 3: update an existing note using: PUT "/api/auth/updatenote". login required
router.put('/updatenote/:id', fetchuser, async(req,res)=>{

    try {
        const {title, description, tag} = req.body;

        //Create a new note object
        //if user provides any change then it will be updated
        const newNote = {};
        if(title)
            newNote.title = title;
        if(description)
            newNote.description = description;
        if(tag)
            newNote.tag = tag;

        //Find the note to be updated and update it.
        let note = await Note.findById(req.params.id);
        if(!note)
            return res.status(404).send("Not found")

        if(note.user.toString() !== req.user.id)
            return res.status(401).send("Not Allowed");
        

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        res.json({note});
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
    }
);




//ROUTE 4: Delete a note using: DELETE "/api/auth/deletenote". login required
router.delete('/deletenote/:id', fetchuser, async(req,res)=>{

    try {
        //Find the note to be deleted and delete it.
        let note = await Note.findById(req.params.id);
        if(!note)
            return res.status(404).send("Not found")

        //Allow deletion only if user owns this note
        if(note.user.toString() !== req.user.id)
            return res.status(401).send("Not Allowed");
        

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success": "note has been deleted", note:note});
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
    }
);




module.exports = router