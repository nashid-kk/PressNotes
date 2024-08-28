import updateWindow from "./window";

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

export default workspace;