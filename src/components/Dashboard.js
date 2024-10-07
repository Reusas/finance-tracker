'use client'


import SummaryCard from "./SummaryCard"
import FinanceForm from "./FinanceForm";
import {useEffect, useState} from 'react'
import { AuthContext } from "@/app/context/AuthContext";
import { useContext } from "react";
export default function Dashboard( {userID} )
{

    const [transactionFormActive, setTransactionFormActive] = useState(false);

    const[TData,setTData] = useState([]);
    const[expenseData,setExpenseData] = useState([]);
    const[incomeData,setIncomeData] = useState([]);

    const{setIsLoggedIn} = useContext(AuthContext);

    setIsLoggedIn(true);


    const handleClick = () =>{
        setTransactionFormActive(true);

    }

    const handleClose = () =>{
        
        setTransactionFormActive(false);
        fetchData();
    }

    useEffect( ()=>
    {
        console.log(transactionFormActive);
    }
    ,[transactionFormActive]);


    const fetchData = async () =>
    {
        console.log("How");
        const tResponse = await fetch('/api/getTransactions',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userID: userID}),
        });

        const tData = await tResponse.json();
        setTData(tData);

        const getExpenses = await fetch('/api/getTransactionSum', // Replace with url to web api
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userID: userID, type:'Expense'}),
        });

        const eData = await getExpenses.json();

        setExpenseData(eData)

        const getIncome = await fetch('/api/getTransactionSum', // Replace with production URL
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userID: userID, type:'Income'}),
        });

        const iData = await getIncome.json();
        setIncomeData(iData);

    }

    useEffect(() =>{
        
        fetchData();
    },[])



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
            {TData.map((item) => (
                <p key={item.id}>{item.date} - {item.amount}$ - {item.type} - {item.category}</p>
            ))}
        </li>
        {transactionFormActive && <FinanceForm onClose={handleClose} userID={userID}/>}



        </div>

        
    );
}