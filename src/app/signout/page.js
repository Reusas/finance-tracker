'use client'
export default function SignOut()
{
    const signOut = async () =>
    {
        await fetch('${window.location.origin}/api/signout',{method: 'POST'});
    }

    signOut();

    window.location.href = '/';

    return(
        <p> You have signed out</p>
    )
}