import React, { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
    const notesInitial=[
        {
          "_id": "666e7599a9014f6bb3c30392",
          "user": "666d59155db436c1c38ce9ef",
          "title": "New testing Updated Note",
          "description": "Please wake up early! updated",
          "tag": "personal",
          "date": "2024-06-16T05:18:17.778Z",
          "__v": 0
        },
        {
          "_id": "666fdb2263772692b46d6277",
          "user": "666d59155db436c1c38ce9ef",
          "title": "My Title",
          "description": "Please wake up early!",
          "tag": "personal",
          "date": "2024-06-17T06:43:46.966Z",
          "__v": 0
        },
        {
          "_id": "666fdb2863772692b46d6279",
          "user": "666d59155db436c1c38ce9ef",
          "title": "My Title",
          "description": "Please wake up early!",
          "tag": "personal",
          "date": "2024-06-17T06:43:52.123Z",
          "__v": 0
        },
        {
          "_id": "666fdb2863772692b46d627b",
          "user": "666d59155db436c1c38ce9ef",
          "title": "My Title",
          "description": "Please wake up early!",
          "tag": "personal",
          "date": "2024-06-17T06:43:52.814Z",
          "__v": 0
        }
      ]

    const [notes,setNotes] = useState(notesInitial);

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;