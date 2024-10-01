import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import Settings from '@/components/Settings';

export default function Home()
{

    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    

    if (!token) {

        return <p className="text-center text-3xl">Log in to access settings page</p>;
    }


    if (!token) {
        console.log("Token does not exist");
        return <p className="text-center text-3xl">Log in to access dashboard</p>;
    }

    try {
        const decodedToken = jwt.verify(token, 'secretKey');
        console.log("Token is valid:", decodedToken);

        return (
            <Settings/>
        
        );




    } catch (err) {
        console.log("Token is invalid or expired");
        return <p className="text-center text-3xl">Token expired or is invalid. Please log in again.</p>;
    }
}