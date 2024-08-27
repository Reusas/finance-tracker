import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import SummaryCard from "@/components/SummaryCard";

export const dynamic = 'force-dynamic';  // Ensure dynamic rendering
export const revalidate = 0; // Disable any static regeneration

export default function Dashboard() {
    // Retrieve the token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    
    // This console.log should appear every time the page is accessed
    console.log("Test");

    if (!token) {
        console.log("Token does not exist");
        return <p className="text-center text-3xl">Log in to access dashboard</p>;
    }

    try {
        const decodedToken = jwt.verify(token, 'secretKey');
        console.log("Token is valid:", decodedToken);

        // Render your dashboard content here
        return (
            <div className='flex justify-center items-start min-h-screen space-x-4'>
            <SummaryCard
            title="Income"
            content="5000 income...."
            />
            <SummaryCard
            title="Expenses"
            content="899 spent...."
            />
            <SummaryCard
            title="Balance"
            content="4101 remaining"
            />
            </div>
            
        );



    } catch (err) {
        console.log("Token is invalid or expired");
        return <p className="text-center text-3xl">Token expired or is invalid. Please log in again.</p>;
    }
}