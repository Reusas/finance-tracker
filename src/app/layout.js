'use client'

import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuthProvider } from './context/AuthContext';
import './globals.css'




export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-slate-300">
        <AuthProvider>
          <main className="flex-grow">
            <Header />
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
