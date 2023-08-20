import './globals.css'
import { ToastContainer } from 'react-toastify'

// import 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';


export const metadata = {
  title: 'ebay',
  description: 'ebay',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        {children}
      </body>
    </html>
  )
}
