'use client'
import {useState} from 'react';


function submit(data)
{
    console.log({date,amount,type});
}


export default  function FinanceForm( {onClose})
{
    const [goalName,setGoalName] = useState('');
    const [targetAmount,setTargetAmount] = useState('');


    const submit = async(e) =>
    {


        const response = await fetch('api/setGoals',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({goalName,targetAmount})
        });

        if(response.ok)
        {
          onClose();
        }
    }



    return(

    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
    
    <div className="bg-white rounded-md w-2/5 h-2/4 flex flex-col relative">
     {/* Top Section with Text and Button */}
     <h2 className="text-xl font-semibold text-center w-full absolute top-1 left-1/2 transform -translate-x-1/2">
        Create goal
      </h2>
      <button className="absolute top-1 right-3 bg-transparent text-xl" onClick={onClose}>
        &#10005; {/* This is a close (X) icon */}
      </button>

      {/* Input Fields Section */}
      <div className="flex flex-col space-y-4 mt-16 absolute left-1/2 transform -translate-x-1/2">
        <div className='flex items-center'>
            <label className='text-nowrap p-2 w-1/2'>Goal Name:</label>
            <input className='rounded-md border border-gray-300 p-2' placeholder='' onChange={(e)=> setGoalName(e.target.value)}></input>
        </div>
        <div className='flex items-center'>
            <label className='text-nowrap p-2 w-1/2'>Target amount:</label>
            <input className='rounded-md border border-gray-300 p-2' placeholder='' type='number' onChange={(e)=> setTargetAmount(e.target.value)}></input>
        </div>
        
      </div>

      


  {/* Bottom Button */}
  <div className="flex justify-center mt-auto p-3">
        <button className="bg-green-500 text-white py-2 px-6 rounded-md" onClick ={submit}>
          Add goal
        </button>
      </div>
      
    </div>
    </div>
    );
}
