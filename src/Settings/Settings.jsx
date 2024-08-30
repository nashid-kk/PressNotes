import React, { useEffect } from 'react'
import './Settinigs.css'
import Selector from './selector';

import FontSilzeSelector from './FontSilzeSelector';

export default function Settings(props) {

  const { editor } = props;



  const eidtorStyle ={
    fontSize: editor.fontSize
  };


  return (
    <>
      <div className="settings">

        <div className="settings-options">
          
          <FontSilzeSelector editor={editor} updateEditor={props.updateEditor}/>

          <div className="settings-option">
            <h4>Font</h4>
            <Selector options={['monospace','sans'
            ]}/>
          </div>

        </div>

      </div>


      <textarea 
        id='main'
        spellCheck={false}
        autoComplete='offd'
        autoCorrect='off'
        style={eidtorStyle}
        defaultValue={'Preview your editor...'}
        >
      </textarea>

      <div className="submit">
        <button id='bt-reset'>Reset</button>
        <button id='bt-cancel'>Cancel</button>
        <button onClick={()=> props.setLocation('Window')} id='bt-apply'>Apply</button>
      </div>
    </>
  )
}