import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const usePasswordToggle = () => {
    const [toggle,setToggle]=useState(false)

    const icon=
        <FontAwesomeIcon 
        icon={toggle?faEye:faEyeSlash}
        onClick={()=>setToggle(!toggle)}
        ></FontAwesomeIcon>
    
    
    const inputType=toggle?'text':'password'

    
    return [icon,inputType]
      
};

export default usePasswordToggle;