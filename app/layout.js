import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tokyo Izakaya Cuisine',
  description: 'Tokyo Izakaya Cuisine是一家专注于日本料理的餐厅，我们提供最正宗的日本料理， 等美味。',
  icons: {
    icon: 'favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
