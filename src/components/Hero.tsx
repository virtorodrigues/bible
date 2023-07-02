'use client'

import { Link } from 'react-scroll'

export function Hero() {
  return (
    <div className="h-screen w-full bg-[url('../assets/bible1.png')] bg-no-repeat bg-fixed bg-cover bg-center shadow-lg overflow-hidden flex justify-center">
      <div className="text-white w-[1200px] bg-red flex items-center justify-center flex-col gap-16 fixed top-[50%] left-[50%] translate-x-[-50%]">
        <h1 className="text-center text-2xl md:text-6xl mt-[-200px] text-shadow-lg">Leia mais a biblia</h1>
        <Link
          className="bg-white text-gray-700 px-5 py-3 rounded duration-200 hover:box-shadow-lg cursor-pointer"
          to={'subscription'}
          spy={true}
          smooth={true}
          duration={500}
        >
          Começar agora
        </Link>
      </div>
    </div>
  )
}