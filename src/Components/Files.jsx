import optionsIcon from '../assets/images/dots.png'
import './files.css'

export default function File(props) {
  
  const { workspace } = props;


  function changeNote(e,note){
    if(e.target.className === 'file') {
      workspace.updateCurrentNote(note);
    }
  }


  function downloadNote(noteName){
    const data = props.notes[noteName];
    
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = noteName;
    a.click();
    
    URL.revokeObjectURL(url);
  }



  return (
 
  <div className="files">
    {Object.keys(props.notes).map((notename)=>(

      <div 
        className='file' 
        onClick={(e)=> changeNote(e,notename)}
        key={notename}
      >
        {notename}
        
        <div className="options-area" >
          <img className='three-dots' src={optionsIcon} alt=" " />
          
          <div className="options">
            <div
              onClick={()=> workspace.renameNote(notename,prompt('New name'))}
             >Rename</div>

            <div
              onClick={()=> workspace.deleteNote(notename)}
            >Delete</div>

            <div
              onClick={()=>downloadNote(notename)} 
            >Download</div>
          </div>
           
        </div>

      </div>
    ))}
  </div>
 
  )
}
