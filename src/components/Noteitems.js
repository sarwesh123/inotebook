import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

export const Noteitems = (props) => {
   const {note,updateNote} =props;
   const context = useContext(NoteContext)
   const {deleteNote}=context;
  return (
    <div className='col-md-3'>
    <div className="card my-3" >
  
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <i className="fa fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)}}></i>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)} }></i>
  </div>
</div>
</div>
  )
}
