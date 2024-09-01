import React from 'react'
import VimTextArea from './vimTa';

class Editor extends React.Component {

  mainRef = React.createRef();
  lineRef =  React.createRef();

  componentDidMount() {
    this.mainRef.current.onscroll = () =>{
      this.lineRef.current.scrollTop = this.mainRef.current.scrollTop;
    }
  }
  
  
  render() {
    
    const {
      window,editor,
      updateWindow,workspace,
    } = this.props;


 
    function calclines (text) {
      if(!text) return '1\n';
      let ln = '';
      for(let lns in text.split('\n')){
        ln += parseInt(lns) + 1 + '\n';
      }
      return ln;
    }

    function handleChange(e) {

      updateWindow({
        ...window, // keep existing values
        lines: calclines(e.target.value),
        value: e.target.value
      });
      workspace.updateNote(window.currentNote, e.target.value);
      
    };

    return (
    <div className="container">

      { editor.showLineNumbers &&
        <textarea 
        id='line-number'
        readOnly cols={1} 
        value={window.lines}
        style={editor}
        ref={this.lineRef}
        />
      }
      
      { workspace.vimEnabled ? 

        <VimTextArea 
          handleChange = {handleChange} 
          value = {window.value || ''}
          style={editor.style}
        />:

        <textarea 
          id='main'
          spellCheck={false}
          onChange={handleChange}
          autoComplete='off'
          autoCorrect='off'
          value={window.value || ''}
          style={editor.style}
          ref={this.mainRef}
          />
      }
      
    </div>
    )
  }

}

export default Editor;