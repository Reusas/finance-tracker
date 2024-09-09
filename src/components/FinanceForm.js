'use client'
import {useState} from 'react';


function submit(data)
{
    console.log({date,amount,type});
}


export default  function FinanceForm( {onClose})
{
    const [date,setDate] = useState('');
    const [amount,setAmount] = useState('');
    const [type,setType] = useState("Expense");
    const [category,setCategory] = useState('Food');

    const submit = async(e) =>
    {
        

        const response = await fetch('api/setTransactions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({date,amount,type,category})
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
        Add transaction
      </h2>
      <button className="absolute top-1 right-3 bg-transparent text-xl" onClick={onClose}>
        &#10005; {/* This is a close (X) icon */}
      </button>

      {/* Input Fields Section */}
      <div className="flex flex-col space-y-4 mt-16 absolute left-1/2 transform -translate-x-1/2">
        <div className="flex items-center ">
            <label className="mr-4 w-1/5 text-right">Date:</label>
        <input type="date" placeholder="Input 1" className="border border-gray-300 p-2 rounded-md" onChange={(e)=> setDate(e.target.value)} />
        </div>
        <div className="flex items-center">
            <label className="mr-4 w-1/5 text-right">Amount:</label>
        <input type="number" placeholder="Input 2" className="border border-gray-300 p-2 rounded-md" onChange={(e)=> setAmount(e.target.value)} />
        </div>
        <div className="flex items-center">
            <label className="mr-4 w-1/5 text-right">Type:</label>
        <select className="rounded-md border border-gray-300 p-2 " value={type} onChange={(e)=> setType(e.target.value)}>
        <option>Expense</option>
        <option>Income</option>
        </select>
        </div>
        <div className="flex items-center">
            <label className="mr-4 w-1/5 text-right">Category:</label>
        <select className="rounded-md border border-gray-300 p-2 " value={category} onChange={(e)=> setCategory(e.target.value)}>
        <option>Food</option>
        <option>Entertainment</option>
        <option>Bills</option>
        <option>Other</option>
        </select>
        </div>
      </div>

      


  {/* Bottom Button */}
  <div className="flex justify-center mt-auto p-3">
        <button className="bg-green-500 text-white py-2 px-6 rounded-md" onClick ={submit}>
          Add transaction
        </button>
      </div>
      
    </div>
    </div>
    );
}

