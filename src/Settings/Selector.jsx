import React  from 'react'

export default function Selector(props) {

  const { options } = props;


  
  const defultSize = props.default ? props.default: '';
  const newOptions = options.filter((element)=> element !== defultSize);

  return (
    <select className='settings-selector' onChange={props.onChange}>

      {
        props.default && 
        <option >{props.default}</option>
      }

      {
        newOptions.map((opt)=>{
          return(
            <option  key={opt}>
              {opt}
            </option>
          )
        })
      }

    </select>
  )
}
