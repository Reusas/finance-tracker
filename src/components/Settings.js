'use client'
import { useState } from "react";
import DeleteAcount from "./DeleteAccount";
export default function Settings()
{

    const [formActive,setFormActive] = useState(false);

    const handleClick = () =>{
        window.location.href = '/changePassword';
    }

    const handleClick2 = () =>
    {
        setFormActive(!formActive);
        
    }



    return (

    
        <div className='flex flex-col justify-center p-5 '>
            <button className='p-2 hover:bg-gray-400' onClick = {handleClick}>Change password</button>
            <button className='p-2 hover:bg-gray-400' onClick = {handleClick2}>Delete account</button>
            {formActive && <DeleteAcount onClose = {handleClick2}/>}
            
        </div>
        
        );
}