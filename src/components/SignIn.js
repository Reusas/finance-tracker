"use client"
import { useState } from "react";
import Link from 'next/link';




// 0 for signin 1 for sign up 2 for change password
export default function Signin({mode})
{
    // Initialize values
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[confirmedPassword,setConfirmedPassword] = useState('');
    const[newPassword,setNewPassword] = useState('');
    const[loginSucessful,setLoginSuccesful] = useState('');



    const handleSubmit = async(e) =>
    {
        e.preventDefault(); // Stop page from reloading

        if(!email.includes('@'))
        {
            setLoginSuccesful("Invalid email format");
            return;
        }

        if(email === "" || password === "")
        {
            setLoginSuccesful("Missing email or password");
            return;
        }

        if(mode == 0)
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
    else if(mode== 1)
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
            setLoginSuccesful("Confirmed password doesnt match")
            console.log("Confirmed password doesnt match");
        }
    }
    else if (mode==2)
    {
            // Turn email and pass to json and send to api
            const response = await fetch('/api/changePass',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({password,newPassword}),
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
    };

    return(
        
        <div className="grid grid-rows-2 gap-4 justify-center items-center">
            <p></p>
            {mode !=2 && (
            <h1 className='text-center text-3xl font-extrabold'>Sign in to Reus Finance Tracker</h1>
            )}
            {mode ==2 && (
                <h1 className='text-center text-3xl font-extrabold'>Change password</h1>
            )}

            <div className="flex flex-row">
            <form className="" onSubmit={handleSubmit}>
                {mode !=2 && (
                <label className="text-sm font-medium text-gray-700">
                    Email:
                    <input type="text" name="emailForm" value = {email} onChange={(e)=> setEmail(e.target.value)} className=" w-full p-2 border border-black rounded-md"/>
                </label>
                )
                }
                <label className="text-sm font-medium">
                    Password:
                    <input type="password"  value = {password} onChange={(e)=> setPassword(e.target.value)}className=" w-full p-2 border border-black rounded-md"/>
                </label>
                {mode == 2 && (
                     <label className="text-sm font-medium">
                     New password:
                     <input type="password"  value = {newPassword} onChange={(e)=> setNewPassword(e.target.value)}className=" w-full p-2 border border-black rounded-md"/>
                 </label>
                )}
                {mode ==1 && (
                    <label className="text-sm font-medium">
                    Confirm Password:
                    <input type="password" value = {confirmedPassword} onChange={(e)=> setConfirmedPassword(e.target.value)}className=" w-full p-2 border border-black rounded-md"/>
                    </label>
                )}
                {mode == 0 && (
                <Link href="/signup" className="hover:text-gray-500"> Sign up</Link>
                )}
            {loginSucessful && (
                <p className="text-red-500 font-bold">{loginSucessful}</p>
            )}
                <input type="submit" className="w-full p-2  border mt-5 bg-green-400 hover:bg-green-600"/>
                
            </form>


            </div>
        </div>
    );
}