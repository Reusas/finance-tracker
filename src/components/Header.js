import Link from 'next/link';
export default function Header()
{
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
            </ul>
          </nav>
        </header>
      );
}