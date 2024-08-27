import Header from '../components/Header';
import Footer from '../components/Footer'
import './globals.css'


export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className='flex flex-col min-h-screen bg-slate-300'>
      <Header/>
        <main className='flex-grow'>
        {children}
        </main>
        <Footer/>
        </body>
    </html>
  );
}
