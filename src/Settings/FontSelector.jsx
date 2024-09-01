import React, { useEffect } from 'react'

import Selector from './selector'
export default function FontSelecotr(props) {
  
  const { updateEditorStyle } = props;

  return (
    <div className="settings-option">
      <h4>Font</h4>
      <Selector
       options={['Monospace','Sans','Serif','Verdana','Arial','Helvetica','Sans-serif']}
       default={props.editor.fontFamily}
       onChange={(e)=> updateEditorStyle('fontFamily',e.target.value)}
        
      />
    </div>

  )
}
