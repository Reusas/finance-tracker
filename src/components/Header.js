import Link from 'next/link';
import { AuthContext,AuthProvider  } from '@/app/context/AuthContext';
import { useContext } from 'react';




export default function Header()
{
    const{isLoggedIn} = useContext(AuthContext);

    return (
        <header className="bg-gray-800 p-9">
          <nav>
            <ul className="flex space-x-12 justify-left">
              <li className="text-white hover:text-gray-300">
                <Link href="/">Home</Link>
              </li>
              <li className="text-white hover:text-gray-300">
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li className="text-white hover:text-gray-300">
                <Link href="/settings">Settings</Link>
              </li>
              {!isLoggedIn ?
              <li className="text-white hover:text-gray-300">
                <Link href="/signin">Sign in</Link>
              </li>
              :
              <li className="text-white hover:text-gray-300">
                <Link href="/signout">Sign out</Link>
              </li>

              }
              
            </ul>
          </nav>
        </header>
      );
}