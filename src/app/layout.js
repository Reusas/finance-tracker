'use client'

import Header from '../components/Header';
import Footer from '../components/Footer'
import './globals.css'

import React, {useState} from 'react';


export default function RootLayout({ children }) {

  return (
    <html lang="en" >
      <body className='flex flex-col min-h-screen bg-slate-300'>
        <main className='flex-grow'>
          <Header isLoggedIn={false}/>
        {children}
        </main>
        <Footer/>
        </body>
    </html>
  );
}
