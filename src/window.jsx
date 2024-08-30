import { useEffect,  useRef,  useState } from 'react';

import SideBar from './Components/NewSide';
import File from './Components/Files';
import './window.css';

// import Element,{ workspace } from './workspace';
import VimTextArea from './vimTa';

const Window = (props)=>{

  let initialNotes = {'Untitled':''};
  let intialCurrentNote = 'Untitled';
  let initialLines = '1\n';
  let initialValue = '';

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
    initialNotes = JSON.parse(localStorage.getItem('notes'));
    intialCurrentNote = localStorage.getItem('lastCurrentNote');
    initialValue = initialNotes[intialCurrentNote];
    initialLines = calcLines(initialValue);
  }

  const [window,updateWindow] = useState({
    notes: initialNotes,
    currentNote: intialCurrentNote,
    lines: initialLines,
    value: initialValue,
    ShowFiles: true
  })

  const mainRef = useRef();

  const [vimEnabled,setVimEnabled] = useState(false);
  const toggleVim = ()=>{
    console.log('Toggling vim');
    setVimEnabled(!vimEnabled);
    if (mainRef.current) {
      mainRef.current.focus();
    } 
  }


  const toggleFiles = ()=>{
    updateWindow({
      ...window,
      ShowFiles: !window.ShowFiles
    })
  }


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



  function handleChange(e){

    updateWindow({
      ...window, // Keep existing values
      lines: calcLines(e.target.value),
      value: e.target.value
    });
    workspace.updateNote(window.currentNote , e.target.value);
    
  } 


useEffect(()=>{
  const main = document.getElementById('main');
  const lineNumber = document.getElementById('line-number');
  main.addEventListener('scroll',()=>{
    lineNumber.scrollTop = main.scrollTop;
  })


  return ()=>{
  main.removeEventListener('scroll',()=>{
  lineNumber.scrollTop = main.scrollTop;
  });
  }
},[])



const workspace = {
  deleteNote: (note ,shouldUpdateCurrentNote)=>{
    console.log("Deleting note : "+note);
    const newNote = {...window.notes};
    delete newNote[note];
    
    const noteNames = Object.keys(newNote);
    if(noteNames.length === 0){
      console.log('last note deleted!');
      workspace.updateCurrentNote('Untitled'); // to save updates into new note
      window.value = '';
      localStorage.removeItem('notes');
      
    } else {
      // const lastNote = Object.values(newNote)[noteNames.length-1];
      if(window.currentNote === note && shouldUpdateCurrentNote){
        console.log('Calling ucn from delete with', noteNames[noteNames.length-1]);
        workspace.updateCurrentNote(noteNames[noteNames.length-1]); // to save updates into new note
      }
    }

    updateWindow({
      ...window,
      notes: newNote
    })
  },


    updateNote : (noteId, newNote = '') => {
      console.log(`updating note ${noteId}`);
      updateWindow((prevWindow) => ({
        ...prevWindow,
        notes: {
          ...prevWindow.notes,
          [noteId]: newNote 
        }
      }));
    },

    renameNote: (oldName,newName)=>{
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
    },


    updateCurrentNote : (noteName) =>{
      console.log('Setting current note: ',noteName);

      updateWindow((prevWindow) => ({
        ...prevWindow,
        currentNote: noteName,
        lines: calcLines(window.notes[noteName]), // update lines
        value: window.notes[noteName], // update note text
      }));
    },
}


  const eidtorStyle ={
    fontSize: editor.fontSize
  }


  return(
    <>
      <div className="window">

        <SideBar 
          workspace={workspace}  
          toggleFiles= {toggleFiles}
          toggleVim={toggleVim}
          vimEnabled={vimEnabled}  
          setLocation={props.setLocation}
        />

        {window.ShowFiles &&
          <File workspace = {workspace} notes={window.notes} />
         }

        <div className="container">

          <textarea 
           id='line-number'
           readOnly cols={1} 
           value={window.lines}
           style={eidtorStyle}
          >
            
          </textarea>
          
          {vimEnabled ? 
            <VimTextArea 
              handleChange = {handleChange} 
              value = {window.value}
              style={eidtorStyle}
            />:
            <textarea 
              id='main'
              spellCheck={false}
              onChange={handleChange}
              autoComplete='off'
              autoCorrect='off'
              value={window.value}
              ref={mainRef}
              style={eidtorStyle}
              >
            </textarea>
          }
          
        </div>

      </div>
      
    </>
  )
}

export default Window;
