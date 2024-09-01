import React,{ useState } from 'react'

import Selector from './selector'

export default function FontSilzeSelector(props) {

  const { editor,updateEditorStyle } = props;
  const [showCoustom,setShowCoustom] = useState(false); // to show/hide coustom optioiins

  // to use as an option in selector
  let currentFontSize = editor.style.fontSize === '1rem' ? 'Default' : editor.fontSize;
  
  let coustomSize = editor.style.fontSize.endsWith('px') ? editor.style.fontSize : '16px';
  const fontSizeOptions = [
    'Default','Large','Medium','Small','Coustom'
  ];
  
  if(!fontSizeOptions.includes(currentFontSize)){
    !showCoustom ?  setShowCoustom(true): null;
    currentFontSize !== 'Coustom' ? currentFontSize = 'Coustom': null; 
  }

  const handleChange = (e)=>{
    let fontSize = e.target.value;
    
    switch(fontSize){
      case 'Coustom':
        setShowCoustom(true);
        fontSize = '';
        break;

      case 'Default': // postion improtant 
        fontSize = '1rem';
        // no break
      default:
        showCoustom ? setShowCoustom(false) : null;
    }
    
    updateEditorStyle('fontSize',fontSize);
  }
  

  return (
    <div className="settings-option">
      <h4>Font size</h4>
      <div>

        <Selector 
          onChange={handleChange}
          options={fontSizeOptions}
          default={currentFontSize}
          editor={editor}
          />

      {
        showCoustom &&
        <input type="number" 
         defaultValue={coustomSize.slice(0,2)}
         min={1} max={50}
         onChange={(e)=> updateEditorStyle('fontSize',e.target.value+'px')}
         />
      }
      </div>
    </div>
  )
}
