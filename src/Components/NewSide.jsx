import React, { useEffect } from 'react'

import filesIcon from '../assets/images/filesIcon.jpg'
import addFileIcon from '../assets/images/plus.png'
import vimIcon from '../assets/images/vimIcon.png'
import settingsIcon from '../assets/images/settings.png'
// import vimIcon from '../assets/images/vim.svg'
import './sidebar.css'
export default function SideBar(prp) {

  const { workspace } = prp;

  function makeNewNote(){
    let newNoteName = prompt("Name: ");
    if(newNoteName.trim()){
      workspace.updateNote(newNoteName,'',true);
      // workspace.updateCurrentNote(newNoteName);
    }
  }
  
  return (
    <div className="sidebar">
      <img src={filesIcon} alt="" onClick={prp.toggleFiles}/>
      <img src={addFileIcon} style={{padding: '10% 0'}} onClick={makeNewNote} alt="" />
      <img src={vimIcon} 
       style={
        workspace.vimEnabled ? { backgroundColor: 'lightgreen' }:null
       }
       onClick={workspace.toggleVim} alt="vim" />
       <img src={settingsIcon} 
        className='settings'
        alt="settings"
        onClick={()=> prp.setLocation('Settings')}
        />

    </div>
  )
}
