import Window from "./window"
import Settings from "./Settings/Settings"
import { useState } from "react"


function App() {

  const [locataion,setLocation] = useState('Editor');
  const [editor,updateEditor] = useState({
    style:{
      fontSize: '1rem',
      fontFamily: 'monospace'
    },
    showLineNumbers: true,
  })

  const updateEditorStyle=(newStyle, value) => {
    updateEditor({
      ...editor,
      style:{
        ...editor.style,
        [newStyle]: value
      }
    })
  }

  const changeEditor= (key,value)=>{
    updateEditor({
      ...editor,
      [key] : value
    })
  }
  

  
  return (
    <>
     
      {
        locataion === 'Settings' ? 
          <Settings editor={editor} changeEditor={changeEditor} updateEditorStyle={updateEditorStyle} setLocation={setLocation}  updateEditor={updateEditor}/> :
          <Window editor={editor}  setLocation={setLocation}/>
      }

    </>
  )
}

export default App
