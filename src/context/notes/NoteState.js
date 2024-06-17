import React, { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
    const notesInitial=[
        {
          "_id": "666e75299a9014f6bb3c30392",
          "user": "666d59155db436c1c38ce9ef",
          "title": "New testing Updated Note",
          "description": "Please wake up early! updated",
          "tag": "personal",
          "date": "2024-06-16T05:18:17.778Z",
          "__v": 0
        },
        {
          "_id": "666fdb2263772692b246d6277",
          "user": "666d59155db436c1c38ce9ef",
          "title": "My Title",
          "description": "Please wake up early!",
          "tag": "personal",
          "date": "2024-06-17T06:43:46.966Z",
          "__v": 0
        },
        {
          "_id": "666f2db2863772692b46d6279",
          "user": "666d59155db436c1c38ce9ef",
          "title": "My Title",
          "description": "Please wake up early!",
          "tag": "personal",
          "date": "2024-06-17T06:43:52.123Z",
          "__v": 0
        },
        {
          "_id": "666fdb2863772692b462d627b",
          "user": "666d59155db436c1c38ce9ef",
          "title": "My Title",
          "description": "Please wake up early!",
          "tag": "personal",
          "date": "2024-06-17T06:43:52.814Z",
          "__v": 0
        },
        {
            "_id": "666fdb22863772692b46d6279",
            "user": "666d59155db436c1c38ce9ef",
            "title": "My Title",
            "description": "Please wake up early!",
            "tag": "personal",
            "date": "2024-06-17T06:43:52.123Z",
            "__v": 0
        },
        {
            "_id": "666fdb2863772692b426d6279",
            "user": "666d59155db436c1c38ce9ef",
            "title": "My Title",
            "description": "Please wake up early!",
            "tag": "personal",
            "date": "2024-06-17T06:43:52.123Z",
            "__v": 0
        },
        {
            "_id": "666fdb28637722692b46d6279",
            "user": "666d59155db436c1c38ce9ef",
            "title": "My Title",
            "description": "Please wake up early!",
            "tag": "personal",
            "date": "2024-06-17T06:43:52.123Z",
            "__v": 0
        },
        {
            "_id": "666fdb2863772692b46d62279",
            "user": "666d59155db436c1c38ce9ef",
            "title": "My Title",
            "description": "Please wake up early!",
            "tag": "personal",
            "date": "2024-06-17T06:43:52.123Z",
            "__v": 0
        }
      ]

    const [notes,setNotes] = useState(notesInitial);


    // Add a Note
      const addNote = (title, description, tag) =>{
        //TODO: API CALL
        console.log("Adding a new note");
        const note = {
            "_id": "666fdb2863772692b46d62279",
            "user": "666d59155db436c1c38ce9ef",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2024-06-17T06:43:52.123Z",
            "__v": 0
        }
        setNotes(notes.concat(note));
      }

    // Delete a Note
      const deleteNote = () =>{
        
      }

    // Edit a Note
      const editNote = () =>{
        
      }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;