'use client'
import { useState } from "react";
export default function DeleteAcount({onClose})
{

    const [password,setPassword] = useState('');
    const [failed,setFailed] = useState(false);
    const submit = async(e) =>
    {
        

        const response = await fetch('api/removeAccount',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({password})
        });

        if(response.ok)
        {
          onClose();
        }
        else
        {
          setFailed(true);
        }
    }

    return(

    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
    
    <div className="bg-white rounded-md w-2/6 h-2/6 flex flex-col relative">
     {/* Top Section with Text and Button */}
     <h2 className="text-xl font-semibold text-center w-full absolute top-1 left-1/2 transform -translate-x-1/2">
        Confirm password
      </h2>
      <button className="absolute top-1 right-3 bg-transparent text-xl" onClick = {onClose}>
        &#10005; {/* This is a close (X) icon */}
      </button>

      <div className="flex flex-col space-y-4 mt-16 absolute left-1/2 transform -translate-x-1/2">
      <div className="flex items-center ">
        <input type="password" placeholder="Password" className="border border-gray-300 p-2 rounded-md" onChange={(e)=> setPassword(e.target.value)} />
        </div>
        <p>NOTE:This action cannot be undone and will remove all of the data associated with this account.</p>
        {failed && (
        <p className="text-red-500 font-bold">Failed to remove account. Make sure password is correct</p>
        )

        }

        </div>
        
  {/* Bottom Button */}
  <div className="flex justify-center mt-auto p-3">
        <button className="bg-green-500 text-white py-2 px-6 rounded-md" onClick={submit}>
          Confirm
        </button>
      </div>
      
    </div>
    </div>
    );
}
