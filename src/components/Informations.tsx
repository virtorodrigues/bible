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

export function Informations() {
  const [verse, setVerse] = useState<DataInterface | null>({} as DataInterface)
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  async function registerUser() {
    const informationsRequests = await fetch(`${process.env.NEXT_PUBLIC_URL}api/email/create-user`,{
      method: 'POST',
      body: JSON.stringify({
        email,
        name,
        html: getHTMLToEmail({ email }),
      })
    })

    const informationsRequestsData = await informationsRequests.json()
    console.log(informationsRequestsData)
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

  return (
    <section id="bible-benefits" className="z-[9] ">
      {/* //z-[9] flex items-center p-5 pt-9 md:p-12 flex-col gap-10 bg-gradient-to-r from-amber-300 to-amber-500"> */}
      {/* <h2 className="text-xl">Voce sabia...</h2> */}
      {/* <div className="w-full md:w-[1200px] flex flex-col gap-10 mb-1"> */}
      <div className="pb-28 flex gap-10 flex-col text-white min-h-screen w-full bg-[url('../assets/image2.png')] bg-no-repeat bg-fixed bg-cover bg-center shadow-lg overflow-hidden items-center">

        <div className="flex gap-10 flex-col mt-4 md:mt-10 justify-center items-center max-w-3xl">

          <div className="flex gap-5 flex-col mt-4 md:mt-10 items-center">

            <h3 className="text-xl md:text-3xl text-center leading-8 md:leading-10 p-3">Você sabe quantos dias por semana são necessários para receber benefícios lendo a bíblia?</h3>

            <div className="flex gap-2 flex-col w-fit">
              <div className="flex gap-2">
                <span className="px-5 py-4 bg-[#aa956e] justify-center items-center flex">
                  1x
                </span>
                <span className="px-5 py-4 bg-[#624669] w-full">
                  mostrou um efeito quase insignificante
                </span>
              </div>

              <div className="flex gap-2">
                <span className="px-5 py-4 bg-[#aa956e] justify-center items-center flex">
                  2x
                </span>
                <span className="px-5 py-4 bg-[#624669] w-full">
                  mostrou um efeito quase insignificante
                </span>
              </div>

              <div className="flex gap-2">
                <span className="px-5 py-4 bg-[#aa956e] justify-center items-center flex">
                  3x
                </span>
                <span className="px-5 py-4 bg-[#624669] w-full">
                  houve um sinal diferente no mapa, como se fosse um batimento cardíaco
                </span>
              </div>

              <div className="flex gap-2">
                <span className="px-5 py-4 bg-[#aa956e] justify-center items-center flex">
                  4x
                </span>
                <span className="px-5 py-4 bg-[#7d418b] w-full">
                  o efeito sobe de forma incrível, algo muda radicalmente!
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-5 flex-col">
            <h3 className="text-xl md:text-3xl text-center leading-8 md:leading-10 p-3">Quais os benefícios de ler a Bíblia 4x ou mais por semana?</h3>
            <div className="bg-[#916b9b] px-5 py-4">
              <span>O sentimento de solidão cai 30%.</span>
            </div>
            <div className="bg-[#624669] px-5 py-4">
              <span>Problemas com raiva caem 32%.</span>
            </div>
            <div className="bg-[#916b9b] px-5 py-4">
              <span>Amargura em relacionamentos, casamento, relacionamento com seus filhos cai 40%.</span>
            </div>
            <div className="bg-[#624669] px-5 py-4">
              <span>Alcoolismo cai 57%.</span>
            </div>
            <div className="bg-[#916b9b] px-5 py-4">
              <span>Diminui cerca de 60% o sentimento de estagnação espiritual.</span>
            </div>
            <div className="bg-[#624669] px-5 py-4">
              <span>Contato com pornografia cai 61%.</span>
            </div>
            <div className="bg-[#916b9b] px-5 py-4">
              <span>E se olharmos para hábitos positivos o comportamento da Fé aumenta 200%.</span>
            </div>
          </div>
        </div>

        <div className="text-sm p-4 flex flex-col gap-5 text-center max-w-xl leading-6">
          <p>
            Porque a palavra de Deus é viva e eficaz, e mais penetrante do que qualquer espada de dois gumes, e penetra até à divisão da alma e do espirito, e das juntas e medulas, e é apta para discernir os pensamentos e intenções do coração.
          </p>
          <p>
            Hebreus 4: 12
          </p>
        </div>
      </div>
    </section>
  )
}
