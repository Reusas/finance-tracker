'use client'


import SummaryCard from "./SummaryCard"
import FinanceForm from "./FinanceForm";
import GoalForm from "./GoalForm";
import {useEffect, useState} from 'react'
export default function Dashboard( {tData, gData, userID} )
{

    const [transactionFormActive, setTransactionFormActive] = useState(false);
    const [goalFormActive, setGoalFormActive] = useState(false);

    const handleClick = () =>{
        setTransactionFormActive(!transactionFormActive);

    }

    const handleClickGoal = () =>{
        setGoalFormActive(!goalFormActive);

    }

    useEffect( ()=>
    {
        console.log(transactionFormActive);
    }
    ,[transactionFormActive]);

    useEffect( ()=>
    {
        console.log(goalFormActive);
    }
    ,[goalFormActive]);

    const getTotalIncome = () =>
    {
        var totalIncome = 0;
        for(const item of tData)
        {
            if(item.type == "income")
            {
                totalIncome += Number(item.amount);
            }
        }

        return totalIncome;
    }

    const getTotalExpense = () =>
    {
        var totalExpense = 0;
        for(const item of tData)
        {
            if(item.type == "expense")
            {
                totalExpense += Number(item.amount);
            }
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
        />
        <SummaryCard
        title="Expenses"
        content={totalExpense}
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
        <div className='flex justify-center p-2 '>
        <p className='text-center font-bold ml-16'>Financial goals:</p>
        <button className='justify-center bg-green-400 border ml-10 w-10' onClick={handleClickGoal}>+</button>
        </div>
        <li className='flex flex-col justify-center items-center '>
            {gData.map((item) => (
                <p key={item.id}>{item.name} - {item.amount}</p>
            ))}
        </li>
        {goalFormActive && <GoalForm onClose={handleClickGoal}/>}

        </div>

        
    );
}