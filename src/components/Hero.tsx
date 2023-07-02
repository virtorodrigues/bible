'use client'

import { Link } from 'react-scroll'
import { Subscription } from './Subscription'

export function Hero() {
  return (
    <div className="h-screen w-full bg-[url('../assets/bible-green1.png')] bg-no-repeat bg-fixed bg-cover bg-center shadow-lg overflow-hidden flex justify-center">
      <div className="text-white w-full p-5 md:w-[1200px] bg-red flex items-center justify-center flex-col gap-5 fixed top-[50%] left-[50%] translate-x-[-50%]">
        <h1 className="text-center text-4xl md:text-6xl mt-[-200px] text-shadow-lg">Leia mais a biblia</h1>
        <Subscription />

        <div className='mt-48 flex gap-4'>
          <Link
            className="text-xs bg-white text-gray-700 px-5 py-3 rounded duration-200 hover:box-shadow-lg cursor-pointer"
            to={'random-verse'}
            spy={true}
            smooth={true}
            duration={500}
          >
            Versiculo de hoje
          </Link>
          <Link
            className="text-xs bg-white text-gray-700 px-5 py-3 rounded duration-200 hover:box-shadow-lg cursor-pointer"
            to={'bible-benefits'}
            spy={true}
            smooth={true}
            duration={500}
          >
            Benefícios da Bíblia
          </Link>
        </div>
      </div>
    </div>
  )
}