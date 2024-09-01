import { useEffect, useRef } from 'react';
import { VIM } from '../lib/jsvim.js';

const VimTextArea = (props) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      const vim = new VIM();
      vim.on_log = (m) => console.log('%cVIM: ' + m,'color: lightgreen;');
      
      vim.attach_to(textareaRef.current);
      textareaRef.current.focus();
    }
  }, []);

  return <textarea 
    ref={textareaRef}
    id='main' 
    style={props.style}
    spellCheck={false} 
    onChange={props.handleChange}
    autoComplete='off'
    autoCorrect='off'
    value={props.value} />;
};

export default VimTextArea;