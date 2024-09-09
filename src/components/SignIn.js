"use client"
import { useState } from "react";



export default function Signin()
{
    // Initialize values
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[loginSucessful,setLoginSuccesful] = useState('');


    const handleSubmit = async(e) =>
    {
        e.preventDefault(); // Stop page from reloading



        // Turn email and pass to json and send to api
        const response = await fetch('/api/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email,password}),
        });

        // Get api response
        const data = await response.json();

        if(response.ok)
        {
            window.location.href = '/dashboard';
        }
        else
        {
            setLoginSuccesful("Login failed. Invalid details.");

        }
    };

    return(
        
        <div className="grid grid-rows-2 gap-3 justify-center items-center">
            <p></p>
            <h1 className='text-center text-3xl font-extrabold'>Sign in to Reus Finance Tracker</h1>
            <div className="">
            <form className="block" onSubmit={handleSubmit}>
                <label className="text-sm font-medium text-gray-700">
                    Email:
                    <input type="text" name="emailForm" value = {email} onChange={(e)=> setEmail(e.target.value)} className=" w-full p-2 border border-black rounded-md"/>
                </label>
                <label className="text-sm font-medium">
                    Password:
                    <input type="password" name="passwordForm" value = {password} onChange={(e)=> setPassword(e.target.value)}className=" w-full p-2 border border-black rounded-md"/>
                </label>
                <input type="submit" className=" w-full p-2  border mt-5 bg-green-400 hover:bg-green-600"/>
            </form>
            {loginSucessful && (
                <p>Failed to login. Invalid username or password</p>
            )}
            </div>
        </div>
    );
}