import { useEffect, useState } from 'react';
import optionsIcon from '../assets/images/dots.png'
import './files.css'

export default function File(props) {
  
  const { workspace } = props;

  function changeNote(note){ // when pressing a note in files
    workspace.updateCurrentNote(note);
  }

  function downloadNote(filename){
    const data = props.notes[note];
    
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    
    URL.revokeObjectURL(url);
  }

  return (
 
  <div className="files">
    {Object.keys(props.notes).map((notename)=>(

      <div 
        className='file' 
        onClick={()=> changeNote(notename)}
        key={notename}
      >
        {notename}
        
        <div className="options-area" >
          <img className='three-dots' src={optionsIcon} alt=" " />
          
          <div className="options">
            <div
              onClick={()=> workspace.renameNote(notename,prompt('New name'))}
             >Rename</div>

            <div
              onClick={()=> workspace.deleteNote(notename,false)}
            >Delete</div>

            <div
              onClick={()=>downloadNote(notename)} 
            >Download</div>
          </div>
           
        </div>

      </div>
    ))}
  </div>
 
  )
}
