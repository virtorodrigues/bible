'use client'

import { Link } from 'react-scroll'
import { Subscription } from './Subscription'
import { Eye, Goal } from 'lucide-react'

export function Hero() {
  return (
    <div className="flex h-screen justify-center overflow-hidden bg-[url('../assets/image2.png')] bg-cover bg-fixed bg-right bg-no-repeat shadow-lg md:bg-center">
      <div className="bg-red fixed left-[50%] top-[50%] flex w-full translate-x-[-50%] flex-col items-center justify-center gap-5 p-5 text-white">
        <h1 className="mt-[-200px] text-center text-4xl text-shadow-lg md:text-7xl">
          Leia mais a biblia
        </h1>
        <Subscription />

        <div className="mt-[20%] flex gap-4">
          <Link
            className="flex cursor-pointer flex-row items-center justify-center gap-2 rounded bg-[#624669] px-4 py-2 text-xs text-white duration-200 box-shadow-sm hover:box-shadow-lg"
            to={'random-verse'}
            spy={true}
            smooth={true}
            duration={500}
          >
            <Eye />
            <span className="whitespace-nowrap">Versiculo de hoje</span>
          </Link>
          <Link
            className="flex cursor-pointer flex-row items-center justify-center gap-2 rounded bg-[#624669] px-4 py-2 text-xs text-white duration-200 box-shadow-sm hover:box-shadow-lg"
            to={'bible-benefits'}
            spy={true}
            smooth={true}
            duration={500}
          >
            <Goal />
            Benefícios
          </Link>
        </div>
      </div>
    </div>
  )
}
