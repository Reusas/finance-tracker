'use client'


import SummaryCard from "./SummaryCard"
import FinanceForm from "./FinanceForm";
import {useEffect, useState} from 'react'
export default function Dashboard( {tData,expenseData,incomeData, userID} )
{

    const [transactionFormActive, setTransactionFormActive] = useState(false);

    const handleClick = () =>{
        setTransactionFormActive(!transactionFormActive);

    }

    useEffect( ()=>
    {
        console.log(transactionFormActive);
    }
    ,[transactionFormActive]);




    const getTotalIncome = () =>
    {
        var totalIncome = 0;
        for(const item of incomeData)
        {

            totalIncome += Number(item.total_sum);
            
        }

        return totalIncome;
    }

    const getTotalExpense = () =>
    {
        var totalExpense = 0;
        for(const item of expenseData)
        {

            totalExpense += Number(item.total_sum);
            
        }

        return totalExpense;
    }

    const totalIncome = getTotalIncome();
    const totalExpense = getTotalExpense();

    return (
        
        
        <div>
        <div className='flex justify-center items-start min-h-12 space-x-4'>
        <SummaryCard
        title="Income"
        content={totalIncome}
        tData = {incomeData}
        />
        <SummaryCard
        title="Expenses"
        content={totalExpense}
        tData = {expenseData}
        />
        </div>
        <div className='flex justify-center p-2'>
        <p className='text-center font-bold ml-16'>Recent transactions</p>
        <button className='justify-center bg-green-400 border ml-10 w-10' onClick={handleClick}>+</button>
        </div>
        <li className='flex flex-col justify-center items-center '>
            {tData.map((item) => (
                <p key={item.id}>{item.date} - {item.amount}$ - {item.type} - {item.category}</p>
            ))}
        </li>
        {transactionFormActive && <FinanceForm onClose={handleClick} userID={userID}/>}



        </div>

        
    );
}