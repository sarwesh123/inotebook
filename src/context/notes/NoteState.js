import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    //Get Note
    const getNotes = async () => {

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            }

        });

        const json = await response.json();
        console.log(json);
        setNotes(json)
    }


    //Add Note
    const addNote = async (title, description, tag) => {
        //Api call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },
            body: JSON.stringify({ title, description, tag })
        });

        const json = await response.json();
        console.log(json)
        //   setNotes((prev)=>({...p,{title,description,tag}));
        // setNotes((prev) => [...prev, { title, description, tag }]);
        await getNotes();
    }


    //Delete Note
    const deleteNote = async (id) => {
        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            }
        });
        const json = await response.json();
        console.log(json)

        const newNote = notes.filter((note) => {
            return note._id !== id;
        })
        setNotes(newNote)
    }

    //Edit Note
    const editNote = async (id, title, description, tag) => {

        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },

            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();
        console.log(json)

        //Logic to show on website
        let newNote = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if (element._id === id) {
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }
        }
        setNotes(newNote)
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;