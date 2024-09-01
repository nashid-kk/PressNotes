import { useEffect,  useRef,  useState } from 'react';

import SideBar from './Components/NewSide';
import File from './Components/Files';
import './window.css';

// import Element,{ workspace } from './workspace';
import Editor from './Components/Editor.jsx'

const Window = (props)=>{

  const initial = {
    notes : {'Untitled':''},
    currentNote: 'Untitled',
    lines : '1\n',
    value : '',
  }

  const { editor } = props;

  const calcLines = (text)=>{
    if(!text) return '1\n';
    let ln = '';
    for(let lns in text.split('\n')){
      ln += parseInt(lns) + 1 + '\n';
    }
    return ln;
  }


  if(localStorage.getItem('notes')){
    initial.notes = JSON.parse(localStorage.getItem('notes'));
    initial.currentNote = localStorage.getItem('lastCurrentNote');
    initial.value = initial.notes[initial.currentNote];
    initial.lines = calcLines(initial.value);
  }

  const [window,updateWindow] = useState({
    ...initial,
    ShowFiles: true
  })

  const [vimEnabled,setVimEnabled] = useState(false),


  toggleFiles = ()=>{
    updateWindow({
      ...window,
      ShowFiles: !window.ShowFiles
    })
  };


  useEffect(()=>{ // for 'notes' 
    const notesString = JSON.stringify(window.notes);
    if(notesString === '{}'){
      localStorage.removeItem('notes');
    } else{
      localStorage.setItem('notes',notesString);
    }
  },[window.notes]);

  useEffect(()=>{
    localStorage.setItem('lastCurrentNote',window.currentNote);
  },[window.currentNote]);





const workspace = {

  vimEnabled: vimEnabled,
  currentNote: window.currentNote,
  toggleVim :()=>{
    console.log('Turing VIM ',!vimEnabled);
    setVimEnabled(!vimEnabled);
  },

  deleteNote: (note)=>{
    console.log("Deleting note : "+note);
    const newNote = {...window.notes};
    delete newNote[note];
    
    const noteNames = Object.keys(newNote);
    if(noteNames.length === 0){
      console.error('last note deleted!');
      workspace.updateCurrentNote('Untitled'); // to save updates into new note
      window.value = '';
      localStorage.removeItem('notes');
    }
    updateWindow({
      ...window,
      notes: newNote
    })

    if(window.currentNote === note){
      // const lastNote = Object.values(newNote)[noteNames.length-1];
      workspace.updateCurrentNote(noteNames[noteNames.length-1]); // to save updates into new note
    }

  },


  updateNote : (noteId,newNote = '',changeCurrentNote = false) => {
    console.log(`updating note ${noteId}`);
    updateWindow((prevWindow) => ({
      ...prevWindow,
      notes: {
        ...prevWindow.notes,
        [noteId]: newNote 
      },
    }));
    if(changeCurrentNote) workspace.updateCurrentNote(noteId);
  },

  renameNote: (oldName,newName)=>{
    if(newName && newName.trim()){
      console.log(`Renaming note '${oldName}' to '${newName}'`);
      const newNotes = {...window.notes,
        [newName]:window.notes[oldName]
      };
      delete newNotes[oldName];

      updateWindow({
        ...window,
        notes: newNotes
      });

      if(window.currentNote === oldName){
        workspace.updateCurrentNote(newName);
      }
    }
  },


  updateCurrentNote : (noteName) =>{
    console.log('Setting current note: ',noteName);

    updateWindow((prevWindow) => ({
      ...prevWindow,
      currentNote: noteName,
      lines: calcLines(window.notes[noteName]), // update lines
      value: window.notes[noteName] || '' // update note text
    }));
  },
}


  return(
    <>
      <div className="window">

        <SideBar 
          workspace={workspace}  
          toggleFiles= {toggleFiles}
          setLocation={props.setLocation}
        />

        {window.ShowFiles &&
          <File workspace = {workspace} notes={window.notes} />
         }

        <Editor 
         window={window} 
         editor = {editor}
         updateWindow={updateWindow}
         workspace={workspace}
        />
      </div>
      
    </>
  )
}

export default Window;
