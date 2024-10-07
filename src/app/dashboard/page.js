
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

    


        return (

        <Dashboard userID={decodedToken.userID}/>
        
        );




    } catch (err) {
        console.log("Token is invalid or expired");
        return <p className="text-center text-3xl">Token expired or is invalid. Please log in again.</p>;
    }
}

