// import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Header/Header'


export const metadata = {
  title: 'Parkway Lock Learner',
  description: 'A tool to learn to use your combination lock',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='app'>
        {/* <main className='main'> */}
          <Header />
          {children}
        {/* </main> */}
      </body>
    </html>
  )
}
