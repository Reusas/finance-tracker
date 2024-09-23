import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import Dashboard from '@/components/Dashboard';
import Header from '@/components/Header';


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
        const transactionResponse = await fetch('https://finance-tracker-seven-inky.vercel.app/api/getTransactions');
        const transactionData = await transactionResponse.json();

        const tResponse = await fetch('https://finance-tracker-seven-inky.vercel.app/api/getTransactions',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({thisUserID}),
        });

        const tData = await tResponse.json();

        console.log(tData);


        const goalResponse = await fetch('https://finance-tracker-seven-inky.vercel.app/api/getGoals');
        const goalData = await goalResponse.json();

        return (

        <Dashboard tData={transactionData} gData = {goalData} userID={decodedToken.userID}/>
        
        );




    } catch (err) {
        console.log("Token is invalid or expired");
        return <p className="text-center text-3xl">Token expired or is invalid. Please log in again.</p>;
    }
}

