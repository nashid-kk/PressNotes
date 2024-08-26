import { useEffect, useState } from 'react';

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

  let [lines, setLines] = useState('1\n');
  let [notes,setNote] = useState(initialNotes);      

  let [currentNote, setCurrentNote] = useState(intialCurrentNote) // to give currentNote to Files


  function handleChange(e){
    if(e.key === 'Enter' || e.key ==='Backspace'){ // can be improved
      let ln = '';
      let split = e.target.value.split("\n");
      
      for(let lns in split){
        ln += parseInt(lns) + 1 + '\n';
      }
      setLines(ln); // refresh lines
  
      setNote((prevNotes)=> ({
        ...prevNotes,
        [currentNote] : e.target.value
      }))
      localStorage.setItem('notes',JSON.stringify(notes));

    }
  }



  useEffect(()=>{

    function handleKeys(event){
      if(event.ctrlKey && event.key === 'n'){
        event.preventDefault();
        
        let newNote = 'N1';
        setNote((prevNotes)=> ({
          ...prevNotes,
          [newNote]:''
        }))
        setCurrentNote(newNote);
        document.getElementById('main').value = '';
      }
    }

    document.getElementById('main').addEventListener('keydown',handleKeys);
    return ()=>{
      document.getElementById('main').removeEventListener('keydown',handleKeys);
    }
  },[])


  useEffect(()=>{
    if(localStorage.getItem('notes')){

      const firstNote = Object.values(JSON.parse(localStorage.getItem('notes')))[0];
      document.getElementById('main').value = firstNote;

    }

  },[])

  return(
    <>
      <div className="window">

        <SideBar setNote={setNote}/>

        <File notes ={notes} currentNote = {setCurrentNote}/>

        <div className="container">

          <textarea id='line-number' readOnly cols={1} value={lines}>
            
          </textarea>
          
          <textarea 
            id='main' 
            spellCheck={false} 
            onKeyUp={handleChange}
            >

          </textarea>
          
        </div>



      </div>
    </>
  )
}


export default Window;