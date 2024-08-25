import React from 'react'

import './files.css'
import optionsIcon from './assets/images/dots.png'

export default function File(props) {


  function changeNote(note){ // when pressing a note in files
    document.getElementById('main').value = props.notes[note];
    props.currentNote(note) 
  }

  return (
 
  <div className="files">
      {Object.keys(props.notes).map((key)=>(

        <div 
        className='file' 
        key={key} 
        onClick={()=> changeNote(key)}
        
        >
          {key}
          <img src={optionsIcon} alt=" " />
        </div>
        
      ))}
    </div>
 
  )
}
