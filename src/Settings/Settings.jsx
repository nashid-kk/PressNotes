import React, { useEffect } from 'react'
import './Settinigs.css'

import FontSilzeSelector from './FontSilzeSelector';
import FontSelecotr from './FontSelector';
import Editor from '../Components/Editor';

export default function Settings(props) {

  const { editor,changeEditor } = props;





  return (
    <>
      <div className="settings">

        <div className="settings-options">
          
          <FontSilzeSelector updateEditorStyle={props.updateEditorStyle} editor={editor} />

          <FontSelecotr updateEditorStyle={props.updateEditorStyle} editor={editor} />

          <div className='settings-option'>
            Show line numbers
            <input type="checkbox" 
            onChange={(e)=> {changeEditor('showLineNumbers',e.target.checked)}}
            checked={editor.showLineNumbers} 
            />
          </div>
        </div>

      </div>

      <div className="settings-container">



       { editor.showLineNumbers &&
        <textarea 
        id='line-number'
        readOnly cols={1} 
        value={window.lines}
        style={editor}
        />
       }

      <textarea 
        className='settings-preview'
        spellCheck={false}
        autoComplete='offd'
        autoCorrect='off'
        style={editor.style}
        defaultValue={'Preview your editor...'}
        />

      </div>



      <div className="submit">
        <button id='bt-reset'>Reset</button>
        <button id='bt-cancel'>Cancel</button>
        <button onClick={()=> props.setLocation('Window')} id='bt-apply'>Apply</button>
      </div>
    </>
  )
}