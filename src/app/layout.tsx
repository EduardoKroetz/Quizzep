"use client"

import { Inter } from 'next/font/google'
import './globals.css'
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "@/components/Header";
import { AuthContextProvider } from "@/hooks/useAuth";
import { UserContextProvider } from "@/hooks/useUsers";
import { QuizzesContextProvider } from '@/hooks/useQuizzes';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="pt-br">
      <head>
        <title>Quizzep</title>
      </head>
      <body className={inter.className}>
        <AuthContextProvider>
          <QuizzesContextProvider>
            <UserContextProvider>
              {children}
            </UserContextProvider>
          </QuizzesContextProvider>
        </AuthContextProvider>
      </body>
    </html>
    

 
  )
}
