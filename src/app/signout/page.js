'use client'
export default function SignOut()
{
    const signOut = async () =>
    {
        await fetch('/api/signout',{method: 'POST'});
    }

    signOut();

    window.location.href = '/';

    return(
        <p> You have signed out</p>
    )
}