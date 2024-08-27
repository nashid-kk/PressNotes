import React, { useEffect } from 'react'

import filesIcon from './assets/filesIcon.jpg'
import addFileIcon from './assets/more.png'
import './sidebar.css'
export default function SideBar(prp) {

  function makeNewNote(){
    let newNoteName = prompt("Name: ");
    if(newNoteName.trim()){
      prp.updateNote(newNoteName);
      prp.updateCurrentNote(newNoteName);
      document.getElementById('main').value = '';
    }
  }


  return (
    <div className="sidebar">
      <img src={filesIcon} alt="" onClick={prp.toggleFiles}/>
      <img src={addFileIcon} onClick={makeNewNote} alt="" />
      
    </div>
  )
}
