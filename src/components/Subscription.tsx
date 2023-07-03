'use client'

import { db } from "@/configFirebase"
import { useEffect, useState } from "react"
import { collection, addDoc } from "firebase/firestore";

interface DataInterface {
  book: {
    name: string
  }
  chapter: string
  number: number
  text: string
}

export function Subscription() {
  const [verse, setVerse] = useState<DataInterface | null>({} as DataInterface)
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  async function registerUser() {
    await fetch(`${process.env.NEXT_PUBLIC_URL}api/email/create-user`,{
      method: 'POST',
      body: JSON.stringify({
        email,
        name,
        html: getHTMLToEmail({ email }),
      })
    })

    //await informationsRequests.json()
    setEmail("")
  }

  function getHTMLToEmail({ email }: { email: string }) {
    const emailValidLink = `${process.env.NEXT_PUBLIC_URL}api/email/valid?email=${email}`

    return `
      <div>
        <h1>Confirme seu e-mail clicando no link a baixo</h1>
        <h3>Clique no link para confirmar seu email <a href='${emailValidLink}'>link</a></h3>
        <h3>Parabéns, seu cadastro foi concluído com sucesso.</h3><br /><br />
      </div>
    `
  }

 /* return (
    <section id="subscription" className="z-[9] flex justify-center items-center p-12 flex-col gap-10 bg-gradient-to-r from-sky-500 to-indigo-500">
      <h2>Cadastre seu E-mail para receber todos os dias um versículo da bíblia</h2>
      <div className="w-full md:w-[1200px] flex flex-col md:flex-row gap-8 md:gap-10 mb-1 justify-center items-start">
        <div className="flex flex-col gap-5 md:flex-row w-full md:w-fit">
          <div className="flex flex-col md:flex-row gap-2 items-start md:items-center w-full md:w-80">
            <span>Nome</span>
            <input type="text" className="text-black px-3 py-1 border border-gray-400 w-full md:w-80" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex flex-col md:flex-row gap-2 items-start md:items-center w-full md:w-80">
            <span>Email</span>
            <input type="text" className="text-black py-1 px-3 border border-gray-400 w-full md:w-80" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>

        <button className="text-white bg-gradient-to-r from-sky-500 to-indigo-500 w-fit h-fit px-4 py-1 rounded hover:bg-gradient-to-l hover:from-sky-500 hover:to-indigo-500" onClick={registerUser}>Cadastrar</button>
      </div>
    </section>
  )*/
  return (
    <div className="flex justify-center items-center flex-col gap-10">
      <h2 className="text-sm">Cadastre seu E-mail para receber todos os dias um versículo da bíblia</h2>
      <div className="h-10 md:h-10 w-full flex flex-row md:flex-row gap-4 mb-1 justify-center items-start">
        <input type="text" placeholder="E-mail" className="text-sm rounded h-full text-black px-3 border border-gray-400 w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="text-sm h-full bg-white text-gray-700 px-4 md:px-5 rounded duration-200 hover:box-shadow-lg cursor-pointer" onClick={registerUser}>Cadastrar</button>
      </div>
    </div>
  )
}
