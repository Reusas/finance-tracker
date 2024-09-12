"use client"
import { useState } from "react";
import Link from 'next/link';



export default function Signin({isSignUp})
{
    // Initialize values
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[confirmedPassword,setConfirmedPassword] = useState('');
    const[loginSucessful,setLoginSuccesful] = useState('');


    const handleSubmit = async(e) =>
    {
        e.preventDefault(); // Stop page from reloading
        if(!isSignUp)
        {
       



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
    }
    else
    {
        if(confirmedPassword == password)
        {
            // Turn email and pass to json and send to api
            const response = await fetch('/api/signup',
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
                window.location.href = '/signin';
            }
            else
            {
                setLoginSuccesful("Login failed. Invalid details.");

            }
        }
        else
        {
            console.log("Confirmed password doesnt match");
        }
    }
    };

    return(
        
        <div className="grid grid-rows-2 gap-4 justify-center items-center">
            <p></p>
            <h1 className='text-center text-3xl font-extrabold'>Sign in to Reus Finance Tracker</h1>
            <div className="flex flex-row">
            <form className="" onSubmit={handleSubmit}>
                <label className="text-sm font-medium text-gray-700">
                    Email:
                    <input type="text" name="emailForm" value = {email} onChange={(e)=> setEmail(e.target.value)} className=" w-full p-2 border border-black rounded-md"/>
                </label>
                <label className="text-sm font-medium">
                    Password:
                    <input type="password" name="passwordForm" value = {password} onChange={(e)=> setPassword(e.target.value)}className=" w-full p-2 border border-black rounded-md"/>
                </label>
                {isSignUp && (
                    <label className="text-sm font-medium">
                    Confirm Password:
                    <input type="password" name="passwordForm" value = {confirmedPassword} onChange={(e)=> setConfirmedPassword(e.target.value)}className=" w-full p-2 border border-black rounded-md"/>
                    </label>
                )}
                {!isSignUp && (
                <Link href="/signup" className="hover:text-gray-500"> Sign up</Link>
                )}

                <input type="submit" className="w-full p-2  border mt-5 bg-green-400 hover:bg-green-600"/>
            </form>
            {loginSucessful && (
                <p>Failed to login. Invalid username or password</p>
            )}
            </div>
        </div>
    );
}