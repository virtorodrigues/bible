import React from 'react'
import './globals.css'
import { Capriola } from 'next/font/google'

const capriola = Capriola({
  subsets: ['latin'],
  weight: '400',
})

export const metadata = {
  title: 'Versículos biblicos',
  description:
    'Leia mais a bíblia. Inscreva-se com seu melhor e-mail e receba todos os dias versículos da bíblia. Você sabia que é necessário ler 4x ou mais bíblia por semana para aproveitar os benefícios desse livro incrível?',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={capriola.className}>{children}</body>
    </html>
  )
}
