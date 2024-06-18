import React, { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
  const host = 'http://localhost:5000'
    const notesInitial=[]

    const [notes,setNotes] = useState(notesInitial);



    //Get all Notes

    const getNotes = async() =>{
        //API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2ZDU5MTU1ZGI0MzZjMWMzOGNlOWVmIn0sImlhdCI6MTcxODQ0MzgwNX0.NgEMPU_4utjHWdSl3gcA4dC456jQiioq8gJCqSJ64dA",
          },
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
      }



    // Add a Note
      const addNote = async(title, description, tag) =>{

        //API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2ZDU5MTU1ZGI0MzZjMWMzOGNlOWVmIn0sImlhdCI6MTcxODQ0MzgwNX0.NgEMPU_4utjHWdSl3gcA4dC456jQiioq8gJCqSJ64dA",
          },
          body: JSON.stringify({title, description, tag}), 
        });
        const json = response.json();



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
      const deleteNote = async(id) =>{
        //API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2ZDU5MTU1ZGI0MzZjMWMzOGNlOWVmIn0sImlhdCI6MTcxODQ0MzgwNX0.NgEMPU_4utjHWdSl3gcA4dC456jQiioq8gJCqSJ64dA",
          }, 
        });
        const json = response.json(); 
        console.log(json);

        const newNotes = notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
      }


    // Edit a Note
      const editNote = async(id, title, description, tag) =>{

        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2ZDU5MTU1ZGI0MzZjMWMzOGNlOWVmIn0sImlhdCI6MTcxODQ0MzgwNX0.NgEMPU_4utjHWdSl3gcA4dC456jQiioq8gJCqSJ64dA",
          },
          body: JSON.stringify({title, description, tag}), 
        });
        const json = response.json(); 

        //Logic to edit Notes
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if(element._id === id)
          {
            element.title = title;
            element.description = description;
            element.tag = tag;
          }
          
        }
      }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;