import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Parkway Lock Learner',
  description: 'A tool to learn to use your combination lock',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body id='app'>{children}</body>
    </html>
  )
}
