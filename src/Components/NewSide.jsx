import React, { useEffect } from 'react'

import filesIcon from '../assets/filesIcon.jpg'
import addFileIcon from '../assets/images/plus.png'
import vimIcon from '../assets/images/vimIcon.png'
import './sidebar.css'
export default function SideBar(prp) {

  const { workspace } = prp;

  function makeNewNote(){
    let newNoteName = prompt("Name: ");
    if(newNoteName.trim()){
      workspace.updateNote(newNoteName);
      workspace.updateCurrentNote(newNoteName);
    }
  }



  return (
    <div className="sidebar">
      <img src={filesIcon} alt="" onClick={prp.toggleFiles}/>
      <img src={addFileIcon} style={{padding: '10% 0'}} onClick={makeNewNote} alt="" />
      <img src={vimIcon} onClick={prp.toggleVim} alt="vim" />
      
    </div>
  )
}
