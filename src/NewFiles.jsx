import optionsIcon from './assets/images/dots.png'
import './files.css'

export default function File(props) {
  
  const {workspace} = props;

  function changeNote(note){ // when pressing a note in files
    document.getElementById('main').value = props.notes[note];
    props.updateCurrentNote(note);
  }




  return (
 
  <div className="files">
    {Object.keys(props.notes).map((key)=>(

      <div 
        className='file' 
        key={key} 
        onClick={()=> changeNote(key)}
      >
        {key}
        
        <div className="options-area">
          <img className='three-dots' src={optionsIcon} alt=" " />
          
          <div className="options">
            <div>Rename</div>

            <div
              onClick={()=> workspace.deleteNote(key)}
            >Delete</div>

            <div>Download</div>
          </div>
        </div>

      </div>
    ))}
  </div>
 
  )
}
