'use client'
export default function SignOut()
{
    const signOut = async () =>
    {
        await fetch('https://finance-tracker-seven-inky.vercel.app/api/signout',{method: 'POST'});
    }

    signOut();

    window.location.href = '/';

    return(
        <p> You have signed out</p>
    )
}