import Window from "./window"
import Settings from "./Settings/Settings"
import { useEffect, useState } from "react"


function App() {

  const [locataion,setLocation] = useState('Editor');
  const [editor,updateEditor] = useState({
    fontSize: '1rem'
  })
  

  
  return (
    <>
     
      {
        locataion === 'Settings' ? 
          <Settings editor={editor} setLocation={setLocation} updateEditor={updateEditor}/> :
          <Window editor={editor}  setLocation={setLocation}/>
      }

    </>
  )
}

export default App
