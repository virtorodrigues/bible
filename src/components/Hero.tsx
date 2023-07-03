'use client'

import { Link } from 'react-scroll'
import { Subscription } from './Subscription'
import { Eye, Goal } from 'lucide-react'

export function Hero() {
  return (
    <div className="h-screen bg-[url('../assets/image2.png')] bg-no-repeat bg-fixed bg-cover bg-right md:bg-center shadow-lg overflow-hidden flex justify-center">
      <div className="text-white p-5 bg-red flex items-center justify-center flex-col gap-5 fixed top-[50%] left-[50%] translate-x-[-50%] md:max-w-4xl w-full">
        <h1 className="text-center text-4xl md:text-7xl mt-[-200px] text-shadow-lg">Leia mais a biblia</h1>
        <Subscription />

        <div className='mt-48 flex gap-4'>
          <Link
            className="text-xs bg-[#624669] text-white px-4 py-2 rounded duration-200 hover:box-shadow-lg cursor-pointer box-shadow-sm flex flex-row justify-center items-center gap-2"
            to={'random-verse'}
            spy={true}
            smooth={true}
            duration={500}
          >
            <Eye />
            Versiculo de hoje
          </Link>
          <Link
            className="text-xs bg-[#624669] text-white px-4 py-2 rounded duration-200 hover:box-shadow-lg cursor-pointer box-shadow-sm flex flex-row justify-center items-center gap-2"
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