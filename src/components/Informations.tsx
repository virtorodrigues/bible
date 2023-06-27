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
    <div className="flex items-center p-5 pt-9 md:p-12 flex-col gap-10 bg-gradient-to-r from-amber-300 to-amber-500">
      <h2 className="text-xl">Voce sabia...</h2>
      <div className="w-full md:w-[1200px] flex flex-col gap-10 mb-1">
        <p>
          O EFEITO DA BIBLIA NO CÉREBRO HUMANO
        </p>

        <p>
          Um estudo foi feito recentemente pelo centro de engajamento Bíblico em que eles estudaram 40.000 pessoas nos Estados Unidos de 8 a 80 anos de idade. Eles apenas queriam ver como nós estamos interagindo com as escrituras.
        </p>

        <p>
          E eles descobriram uma coisa que acabou se tornando a principal descoberta do estudo em si. Eles não estavam procurando por isso e se tornou o ponto principal do estudo. Quando nós lemos a Bíblia 1x por semana, e isso poderia ser o culto de domingo, quando o pastor diz: “Abra sua Bíblia” e nós ouvimos a mensagem.
        </p>
        <p>
          1 x por semana mostrou um efeito quase insignificante em algumas áreas chave da sua vida. Vou explicar melhor daqui a pouco.
        </p>
        <p>
          2 x por semana efeito quase insignificante. Agora =, ao lermos 3 x por semana houve um sinal diferente no mapa, como se fosse um batimento cardíaco. Algo aconteceu, ainda que fosse como um batimento.
        </p>
        <p>
          Mas a profunda descoberta é essa: quando lemos a Bíblia 4 x por semana o efeito sobe de forma incrível. O esperado seria que fosse 1, 2… que houvesse um aumento gradual do efeito e impacto na sua vida. Mas foi literalmente 1,2,3…4! algo muda radicalmente!
        </p>
        <p>
          O sentimento de solidão cai 30%. Isso lendo a Bíblica 4 x por semana.
        </p>
        <p>
          Problemas com raiva caem 32%.
        </p>
        <p>
          Amargura em relacionamentos, casamento, relacionamento com seus filhos cai 40%.
        </p>
        <p>
          Alcoolismo cai 57%.
        </p>
        <p>
          Sentimento de estagnação espiritual… se eu tivesse que escolher uma área, quando eu converso com as pessoas, na qual elas são realmente honestas é que elas se sentem estagnadas espiritualmente.
        </p>
        <p>
          É só fazer a pergunta: “Quanto tempo você gasta na palavra?”
        </p>
        <p>
          Lendo a bíblica 4 x por semana ou mais esse sentimento cai 60%.
        </p>
        <p>
          Contato com pornografia cai 61%.
        </p>
        <p>
          E se olharmos para hábitos positivos o comportamento da Fé aumenta200%, porque você confia na palavra de Deus. E há um aumento de 230% no discipulado.
        </p>
        <p>
          Porque a palavra de Deus é viva e eficaz, e mais penetrante do que qualquer espada de dois gumes, e penetra até à divisão da alma e do espirito, e das juntas e medulas, e é apta para discernir os pensamentos e intenções do coração.
        </p>
        <p>
          Hebreus 4: 12
        </p>
      </div>
    </div>
  )
}
