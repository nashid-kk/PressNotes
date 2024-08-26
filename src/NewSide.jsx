import React, { useEffect } from 'react'

import filesIcon from './assets/filesIcon.jpg'
import addFileIcon from './assets/more.png'
import './sidebar.css'
export default function SideBar(prp) {

  function makeNewNote(){
    let newNote = prompt("Name: ");
    prp.setNote((prevNotes)=> ({
      ...prevNotes,
      [newNote]:''
    }))
    // setCurrentNote(newNote);
    document.getElementById('main').value = '';
  }


  return (
    <div className="sidebar">
      <img src={filesIcon} alt="" />
      <img src={addFileIcon} onClick={makeNewNote} alt="" />
      
    </div>
  )
}
