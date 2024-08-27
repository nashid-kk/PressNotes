import { useEffect, useRef, useState } from 'react';

import SideBar from './NewSide';
import File from './NewFiles';
import './window.css'

function Window(){

  let initialNotes = {'Untitled':''};
  let intialCurrentNote = 'Untitled';

  if(localStorage.getItem('notes')){
    initialNotes = JSON.parse(localStorage.getItem('notes'));
    intialCurrentNote = Object.keys(JSON.parse(localStorage.getItem('notes')))[0]; 
  }

  const [window,updateWindow] = useState({
    notes: initialNotes,
    currentNote: intialCurrentNote,
    lines: '1\n',
    value: '',
    ShowFiles: true
  })

  const toggleFiles = ()=>{
    updateWindow({
      ...window,
      ShowFiles: !window.ShowFiles
    })
  }

  const updateNote = (noteId, newNote = '') => {
    console.log(`updating note ${noteId}`);
    updateWindow((prevWindow) => ({
      ...prevWindow,
      notes: {
        ...prevWindow.notes,
        [noteId]: newNote 
      }
    }));
  };

  const updateCurrentNote = (noteName) =>{
    console.log('Setting current note: ',noteName);
    let ln = '1\n';
    if(window.notes[noteName]){
      ln = '';
      for(let lns in window.notes[noteName].split('\n')){
        ln += parseInt(lns) + 1 + '\n';
      }
    }
    updateWindow((prevWindow) => ({
      ...prevWindow,
      currentNote: noteName,
      lines: ln
    }));
    window.value = window.notes[noteName];
  }

  useEffect(()=>{
    const notesString = JSON.stringify(window.notes);
    if(notesString === '{}'){
      localStorage.removeItem('notes');
    } else{
      localStorage.setItem('notes',notesString);
    }
  },[window.notes]);


  const workspace = {
    deleteNote: (note)=>{
      console.log("Deleting note : "+note);
      const newNote = {...window.notes};
      delete newNote[note];
      
      const noteNames = Object.keys(newNote);
      if(noteNames.length === 0){
        console.log('last note deleted!');
        updateCurrentNote('Untitled'); // to save updates into new note
        window.value = '';
        localStorage.removeItem('notes');
        
      } else {
        const lastNote = Object.values(newNote)[noteNames.length-1];
        updateCurrentNote(noteNames[noteNames.length-1]); // to save updates into new note
      }

      updateWindow({
        ...window,
        notes: newNote
      })
    }
  }



  function handleChange(e){
    // if(e.key === 'Enter' || e.key ==='Backspace'){ // can be improved
    //   let ln = '';
    //   let split = e.target.value.split("\n");
      
    //   for(let lns in split){
    //     ln += parseInt(lns) + 1 + '\n';
    //   }

    //   updateWindow({
    //     ...window, // Keep existing values
    //     lines: ln
    //   });


    //   updateNote(window.currentNote,e.target.value);

    // }

    let ln = '';
    for(let lns in e.target.value.split('\n')){
      ln += parseInt(lns) + 1 + '\n';
    }

    updateWindow({
      ...window, // Keep existing values
      lines: ln,
      value: e.target.value
    });
      updateNote(window.currentNote,e.target.value);
    
  } 


  useEffect(()=>{
    if(localStorage.getItem('notes')){
      const firstNote = Object.values(JSON.parse(localStorage.getItem('notes')))[0];
      document.getElementById('main').value = firstNote;
    }
  },[])

  return(
    <>
      <div className="window">

        <SideBar updateNote={updateNote} updateCurrentNote = {updateCurrentNote} toggleFiles= {toggleFiles}/>

        {window.ShowFiles &&
          <File workspace = {workspace} notes ={window.notes} updateCurrentNote = {updateCurrentNote} />
         }

        <div className="container">

          <textarea id='line-number' readOnly cols={1} value={window.lines}>
            
          </textarea>
          
          <textarea 
            id='main' 
            spellCheck={false} 
            onChange={handleChange}
            autoComplete='off'
            autoCorrect='off'
            value={window.value}
            >
          </textarea>
          
        </div>



      </div>
    </>
  )
}


export default Window;