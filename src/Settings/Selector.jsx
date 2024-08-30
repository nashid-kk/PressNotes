import React  from 'react'

export default function Selector(props) {

  const { options,capitalizefirst } = props;


  
  // const capitalizefirst=(word)=>{
  //   return word.charAt(0).toUpperCase() + word.slice(1);
  // }
  const defultSize = capitalizefirst ? capitalizefirst(props.default ? props.default: ''): null;
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
