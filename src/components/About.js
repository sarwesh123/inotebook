import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
function About() {
    const a = useContext(NoteContext);
  return (
    <div className='container ' style={{marginTop:"70px"}}>
        <p1>
            My name id {a.name} and I'm {a.age} year old
        </p1>
    </div>
  )
}

export default About