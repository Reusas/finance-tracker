'use client'
import { useRouter } from 'next/navigation';
export default function SignOut()
{

    const router = useRouter();
    const signOut = async () =>
    {
        await fetch('/api/signout',{method: 'POST'});
    }

    signOut();

    router.push('/');

    return(
        <p> You have signed out</p>
    )
}