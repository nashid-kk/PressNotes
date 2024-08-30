import React,{ useState } from 'react'

import Selector from './selector'

export default function FontSilzeSelector(props) {

  const { editor } = props;
  const [showCoustom,setShowCoustom] = useState(false); // to show/hide coustom optioiins

  const capitalizefirst=(word)=>{
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  // to use as an option in selector
  let currentFontSize = editor.fontSize === '1rem' ? 'Default' : editor.fontSize;
  let coustomSize = editor.fontSize;
  let fontSizeOptions = [
    'Default','Large','Medium','Small','Coustom'
  ];
  
  if(!fontSizeOptions.includes(capitalizefirst(currentFontSize))){
    !showCoustom ?  setShowCoustom(true): null;
    !currentFontSize === 'Coustom' ? currentFontSize = 'Coustom': null; 
    currentFontSize = 'Coustom';
  }

  const handleChange = (e)=>{
    let fontSize = e.target.value.toLowerCase();
    
    switch(fontSize){
      case 'coustom':
        setShowCoustom(true);
        fontSize = '';
        break;

      case 'default': // postion improtant 
        fontSize = '1rem';
        // no break
      default:
        showCoustom ? setShowCoustom(false) : null;
    }
    
    props.updateEditor({
      ...props.editor,
      fontSize: fontSize
    });
  }
  

  const handleCoustomChane=(e)=>{
    coustomSize =  e.target.value +'px';

    props.updateEditor({
      ...props.editor,
      fontSize: coustomSize
    });
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
          capitalizefirst={capitalizefirst}
          />

      {
        showCoustom &&
        <input type="number" 
         defaultValue={coustomSize.slice(0,2)}
         min={1} max={50}
         onChange={handleCoustomChane}
         />
      }
      </div>
    </div>
  )
}
