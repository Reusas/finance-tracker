import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import Dashboard from '@/components/Dashboard';


export default async function Page() {
    // Retrieve the token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    


    if (!token) {
        console.log("Token does not exist");
        return <p className="text-center text-3xl">Log in to access dashboard</p>;
    }

    try {
        const decodedToken = jwt.verify(token, 'secretKey');
        const thisUserID = decodedToken.userID;
        console.log("Token is valid:", decodedToken);


        const tResponse = await fetch('https://finance-tracker-seven-inky.vercel.app//api/getTransactions',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userID: thisUserID}),
        });

        const tData = await tResponse.json();

        const getExpenses = await fetch('https://finance-tracker-seven-inky.vercel.app//api/getTransactionSum', // Replace with url to web api
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userID: thisUserID, type:'Expense'}),
        });

        const expenseData = await getExpenses.json();

        console.log(expenseData);

        const getIncome = await fetch('https://finance-tracker-seven-inky.vercel.app//api/getTransactionSum', // Replace with production URL
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userID: thisUserID, type:'Income'}),
        });

        const incomeData = await getIncome.json();


        return (

        <Dashboard tData={tData} expenseData = {expenseData} incomeData= {incomeData} userID={decodedToken.userID}/>
        
        );




    } catch (err) {
        console.log("Token is invalid or expired");
        return <p className="text-center text-3xl">Token expired or is invalid. Please log in again.</p>;
    }
}

